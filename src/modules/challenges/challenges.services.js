import prisma from "../../config/database.js";

const createChallenge = async (userId, body) => {
  const { title, description, recipeId, weekStart, weekEnd } = body;

  const challenge = await prisma.challenge.create({
    data: {
      userId,
      title,
      description,
      recipeId,
      weekStart: new Date(weekStart),
      weekEnd: new Date(weekEnd),
    },
  });

  return challenge;
};

const getAllChallenges = async () => {
  const challenges = await prisma.challenge.findMany({
    include: {
      recipe: {
        select: {
          id: true,
          title: true,
          imageUrl: true,
          budgetIdr: true,
        },
      },
      _count: {
        select: { participants: true },
      },
    },
    orderBy: [{ weekStart: "desc" }, { title: "asc" }],
  });

  return challenges;
};

const getChallengeById = async (id) => {
  const challenge = await prisma.challenge.findUnique({
    where: { id },
    include: {
      recipe: {
        select: {
          id: true,
          title: true,
          imageUrl: true,
          budgetIdr: true,
        },
      },
      participants: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              avatarUrl: true,
            },
          },
        },
      },

      _count: {
        select: { participants: true },
      },
    },
  });

  if (!challenge) {
    throw new Error("Challenge tidak ditemukan");
  }

  return challenge;
};

const joinChallenge = async (userId, challengeId) => {
  const challenge = await prisma.challenge.findUnique({
    where: { id: challengeId },
  });

  if (!challenge) {
    throw new Error("Challenge tidak ditemukan");
  }

  const existing = await prisma.challengeParticipant.findUnique({
    where: {
      userId_challengeId: { userId, challengeId },
    },
  });

  if (existing) {
    throw new Error("Kamu sudah ikut challenge ini");
  }

  const participant = await prisma.challengeParticipant.create({
    data: { userId, challengeId },
    include: {
      challenge: true,
      user: {
        select: {
          id: true,
          name: true,
          avatarUrl: true,
        },
      },
    },
  });
  return participant;
};

const deleteChallenge = async (userId, challengeId) => {
  const challenge = await prisma.challenge.findUnique({
    where: { id: challengeId },
  });

  if (!challenge) {
    throw new Error("Challenge tidak ditemukan");
  }

  if (challenge.userId !== userId) {
    throw new Error("Kamu tidak berhak menghapus challenge ini");
  }

  // hapus participants dulu sebelum hapus challenge
  await prisma.challengeParticipant.deleteMany({
    where: { challengeId },
  });

  await prisma.challenge.delete({
    where: { id: challengeId },
  });

  return { message: "Challenge berhasil dihapus" };
};

export default {
  getAllChallenges,
  getChallengeById,
  createChallenge,
  joinChallenge,
  deleteChallenge,
};

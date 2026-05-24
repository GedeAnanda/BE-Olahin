import prisma from "../../config/database.js";

const getUserProfile = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      avatarUrl: true,
      bio: true,
      createdAt: true,
      _count: {
        select: {
          recipes: true,
          bookmarks: true,
          participants: true,
        },
      },
    },
  });

  if (!user) {
    throw new Error("User tidak ditemukan");
  }

  return user;
};

const updateProfil = async (userId, body) => {
  const { name, bio, avatarUrl } = body;

  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      name,
      bio,
      avatarUrl,
    },
    select: {
      id: true,
      name: true,
      email: true,
      avatarUrl: true,
      bio: true,
      createdAt: true,
    },
  });
  return user;
};

export default { getUserProfile, updateProfil };

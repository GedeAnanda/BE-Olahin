import prisma from "../../config/database.js";

const getBookmarks = async (userId) => {
  console.log("userId:", userId);
  const bookmarks = await prisma.bookmark.findMany({
    where: { userId },
    include: {
      recipe: {
        include: {
          user: {
            select: { id: true, name: true, avatarUrl: true },
          },
          ingredients: true,
          _count: {
            select: { bookmarks: true },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return bookmarks;
};

const addBookmark = async (userId, recipeId) => {
  const recipe = await prisma.recipe.findUnique({
    where: {
      id: recipeId,
    },
  });

  if (!recipe) {
    throw new Error("Resep tidak ditemukan");
  }

  const existing = await prisma.bookmark.findUnique({
    where: {
      userId_recipeId: { userId, recipeId },
    },
  });

  if (existing) {
    throw new Error("Resep sudah di bookmark");
  }

  const bookmark = await prisma.bookmark.create({
    data: {
      userId,
      recipeId,
    },
    include: {
      recipe: true,
    },
  });

  return bookmark;
};

const deleteBookmark = async (userId, recipeId) => {
  const existing = await prisma.bookmark.findUnique({
    where: {
      userId_recipeId: { userId, recipeId },
    },
  });

  if (!existing) {
    throw new Error("Bookmark tidak ditemukan");
  }

  await prisma.bookmark.delete({
    where: {
      userId_recipeId: { userId, recipeId },
    },
  });

  return {
    message: "Bookmark berhasil dihapus",
  };
};

export default { getBookmarks, addBookmark, deleteBookmark };

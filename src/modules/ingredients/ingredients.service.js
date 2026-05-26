import prisma from "../../config/database.js";

const getAllIngredients = async (userId) => {
  const ingredients = await prisma.userIngredient.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return ingredients;
};

const getExpiringIngredients = async (userId) => {
  const threeDaysFromNow = new Date();
  threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);

  const ingredients = await prisma.userIngredient.findMany({
    where: {
      userId,
      expiredAt: {
        lte: threeDaysFromNow,
      },
    },
    orderBy: {
      expiredAt: "asc",
    },
  });
  return ingredients;
};

const addIngredient = async (userId, body) => {
  const { name, category, quantity, unit, expiredAt } = body;

  const ingredient = await prisma.userIngredient.create({
    data: {
      userId,
      name,
      category,
      quantity,
      unit,
      expiredAt: expiredAt ? new Date(expiredAt) : null,
    },
  });

  return ingredient;
};

const updateIngredient = async (userId, ingredientId, body) => {
  const ingredient = await prisma.userIngredient.findUnique({
    where: { id: ingredientId },
  });

  if (!ingredient) {
    throw new Error("Bahan tidak ditemukan");
  }

  if (ingredient.userId !== userId) {
    throw new Error("Kamu tidak berhak mengubah bahan ini");
  }

  const updated = await prisma.userIngredient.update({
    where: { id: ingredientId },
    data: {
      ...(body.name && { name: body.name }),
      ...(body.category && { category: body.category }),
      ...(body.quantity !== undefined && { quantity: body.quantity }),
      ...(body.unit && { unit: body.unit }),
      ...(body.expiredAt !== undefined && {
        expiredAt: body.expiredAt ? new Date(body.expiredAt) : null,
      }),
    },
  });

  return updated;
};

const deleteIngredient = async (userId, ingredientId) => {
  const ingredient = await prisma.userIngredient.findUnique({
    where: {
      id: ingredientId,
    },
  });

  if (!ingredient) {
    throw new Error("Bahan tidak ditemukan");
  }

  if (ingredient.userId !== userId) {
    throw new Error("Kamu tidak berhak menghapus bahan ini");
  }

  await prisma.userIngredient.delete({
    where: {
      id: ingredientId,
    },
  });

  return {
    message: "Bahan berhasil dihapus",
  };
};

export default {
  getAllIngredients,
  getExpiringIngredients,
  addIngredient,
  updateIngredient,
  deleteIngredient,
};

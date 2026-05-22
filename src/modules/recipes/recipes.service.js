import prisma from "../../config/database.js";

const getAllRecipes = async ({ page = 1, limit = 10, popular }) => {
  const skip = (page - 1) * limit;

  const where = {};
  if (popular === "true") {
    where.isPopular = true;
  }

  const [recipes, total] = await prisma.$transaction([
    prisma.recipe.findMany({
      where,
      skip,
      take: Number(limit),
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
        ingredients: true,
        _count: {
          select: { bookmarks: true },
        },
      },
    }),
    prisma.recipe.count({ where }),
  ]);

  return {
    data: recipes,
    meta: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getRecipeById = async (id) => {
  const recipe = await prisma.recipe.findUnique({
    where: { id },
    include: {
      user: {
        select: { id: true, name: true, avatarUrl: true },
      },
      ingredients: true,
      steps: {
        orderBy: { stepNumber: "asc" },
      },
      _count: {
        select: { bookmarks: true },
      },
    },
  });

  if (!recipe) {
    throw new Error("Resep tidak ditemukan");
  }

  return recipe;
};

// menacri resep dari bahan bahan yang ada misal telur dan tahu berarti hasilnya harus resep yang menggunakan dua itu
const searchRecipeByIngredients = async (ingredients) => {
  const ingredientList = ingredients.split(",").map((i) => i.trim());

  const recipes = await prisma.recipe.findMany({
    where: {
      ingredients: {
        some: {
          name: {
            in: ingredientList,
            mode: "insensitive",
          },
        },
      },
    },
    include: {
      user: {
        select: { id: true, name: true, avatarUrl: true },
      },
      ingredients: true,
      _count: {
        select: { bookmarks: true },
      },
    },
  });

  const filtered = recipes.filter((recipe) => {
    const recipeIngredientNames = recipe.ingredients.map((i) =>
      i.name.toLowerCase(),
    );
    return ingredientList.every((bahan) =>
      recipeIngredientNames.includes(bahan),
    );
  });

  return filtered;
};

const createRecipe = async (userId, body) => {
  const {
    title,
    description,
    imageUrl,
    budgetIdr,
    servingSize,
    cookTimeMin,
    isPopular,
    ingredients,
    steps,
  } = body;

  const recipe = await prisma.recipe.create({
    data: {
      userId,
      title,
      description,
      imageUrl,
      budgetIdr,
      servingSize,
      cookTimeMin,
      isPopular: isPopular || false,
      ingredients: {
        create: ingredients,
      },
      steps: {
        create: steps,
      },
    },
    include: {
      ingredients: true,
      steps: true,
    },
  });

  return recipe;
};

const updateRecipe = async (userId, recipeId, body) => {
  const recipe = await prisma.recipe.findUnique({
    where: {
      id: recipeId,
    },
  });

  if (!recipe) {
    throw new Error("Resep tidak ditemukan");
  }

  if (recipe.userId !== userId) {
    throw new Error("Ini bukan resep milik anda, anda tidak berhak mengedit");
  }

  const updated = await prisma.recipe.update({
    where: { id: recipeId },
    data: {
      title: body.title,
      description: body.description,
      imageUrl: body.imageUrl,
      budgetIdr: body.budgetIdr,
      servingSize: body.servingSize,
      cookTimeMin: body.cookTimeMin,
      isPopular: body.isPopular,
    },
    include: {
      ingredients: true,
      steps: true,
    },
  });

  return updated;
};

const deleteRecipe = async (userId, recipeId) => {
  const recipe = await prisma.recipe.findUnique({
    where: {
      id: recipeId,
    },
  });

  if (!recipe) {
    throw new Error("Resep tidak ditemukan");
  }

  if (recipe.userId !== userId) {
    throw new Error("Kamu tidak berhak menghapus resep ini");
  }

  await prisma.recipe.delete({
    where: {
      id: recipeId,
    },
  });

  return {
    message: "Resep berhasil dihapus",
  };
};

export default {
  getAllRecipes,
  getRecipeById,
  searchRecipeByIngredients,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};

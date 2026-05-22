import { success } from "zod";
import recipesService from "./recipes.service.js";

const getAllRecipes = async (req, res) => {
  try {
    const { page, limit, popular } = req.query;

    const result = await recipesService.getAllRecipes({ page, limit, popular });

    return res.status(200).json({
      success: true,
      message: "Berhasil ambil semua resep",
      ...result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await recipesService.getRecipeById(id);

    return res.status(200).json({
      success: true,
      message: "Berhasil ambil detail resep",
      ...data,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const searchRecipeByIngredients = async (req, res) => {
  try {
    const { ingredients } = req.query;

    if (!ingredients) {
      return res.status(400).json({
        success: false,
        message: "Bahan wajib diisi",
      });
    }

    const data = await recipesService.searchRecipeByIngredients(ingredients);

    if (data.length === 0) {
      return res.status(200).json({
        success: true,
        message: "Belum ada resep untuk bahan ini",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Berhasil mencari resep",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createRecipe = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, budgetIdr, servingSize, cookTimeMin } = req.body;

    if (!title || !budgetIdr || !servingSize || !cookTimeMin) {
      return res.status(400).json({
        success: false,
        message: "Title, budget, serving size, dan cook time wajib diisi",
      });
    }

    const data = await recipesService.createRecipe(userId, req.body);

    return res.status(201).json({
      success: true,
      message: "Berhasil membuat resep",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateRecipe = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const data = await recipesService.updateRecipe(userId, id, req.body);

    return res.status(200).json({
      success: true,
      message: "Berhasil update resep",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const data = await recipesService.deleteRecipe(userId, id);

    return res.status(200).json({
      success: true,
      message: data.message,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export default {
  getAllRecipes,
  getRecipeById,
  searchRecipeByIngredients,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};

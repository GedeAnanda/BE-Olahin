import { Router } from "express";
import recipeController from "./recipe.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";

const router = Router();

router.get("/search", recipeController.searchRecipeByIngredients);
router.get("/", recipeController.getAllRecipes);
router.get("/:id", recipeController.getRecipeById);
router.post("/", authMiddleware, recipeController.createRecipe);
router.put("/:id", authMiddleware, recipeController.updateRecipe);
router.delete("/:id", authMiddleware, recipeController.deleteRecipe);

export default router;

import { Router } from "express";
import recipeController from "./recipe.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import {
  createRecipeSchema,
  updateRecipeSchema,
} from "./recipes.validation.js";

const router = Router();

router.get("/search", recipeController.searchRecipeByIngredients);
router.get("/", recipeController.getAllRecipes);
router.get("/:id", recipeController.getRecipeById);
router.post(
  "/",
  authMiddleware,
  validate(createRecipeSchema),
  recipeController.createRecipe,
);
router.put(
  "/:id",
  authMiddleware,
  validate(updateRecipeSchema),
  recipeController.updateRecipe,
);
router.delete("/:id", authMiddleware, recipeController.deleteRecipe);

export default router;

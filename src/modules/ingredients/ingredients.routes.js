import { Router } from "express";
import ingredientController from './ingredients.controller.js'
import authMiddleware from "../../middlewares/auth.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import { z } from "zod";

const router = Router();

const ingredientSchema = z.object({
  name: z.string().min(1, "Nama bahan wajib diisi"),
  category: z.string().min(1, "Kategori wajib diisi"),
  quantity: z.number().min(0, "Jumlah tidak boleh negatif"),
  unit: z.string().min(1, "Satuan wajib diisi"),
  expiredAt: z.string().datetime().optional(),
});

router.get("/", authMiddleware, ingredientController.getAllIngredients);
router.get(
  "/expiring",
  authMiddleware,
  ingredientController.getExpiringIngredients,
);
router.post(
  "/",
  authMiddleware,
  validate(ingredientSchema),
  ingredientController.addIngredient,
);
router.patch(
  "/:id",
  authMiddleware,
  validate(ingredientSchema.partial()),
  ingredientController.updateIngredient,
);
router.delete("/:id", authMiddleware, ingredientController.deleteIngredient);

export default router;

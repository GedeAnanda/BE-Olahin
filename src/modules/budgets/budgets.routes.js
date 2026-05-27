import { Router } from "express";
import budgetController from "./budgets.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import { z } from "zod";

const router = Router();

const createBudgetSchema = z.object({
  month: z.number().min(1).max(12, "Bulan harus antara 1-12"),
  year: z.number().min(2024, "Tahun tidak valid"),
  limitAmount: z.number().min(1000, "Limit minimal Rp 1.000"),
});

const transactionSchema = z.object({
  title: z.string().min(1, "Judul transaksi wajib diisi"),
  amount: z.number().min(1, "Jumlah minimal Rp 1"),
  type: z.enum(["EXPENSE", "INCOME"], {
    errorMap: () => ({ message: "Type harus EXPENSE atau INCOME" }),
  }),
});

router.get("/", authMiddleware, budgetController.getBudget);
router.post(
  "/",
  authMiddleware,
  validate(createBudgetSchema),
  budgetController.createBudget,
);
router.get(
  "/:budgetId/transactions",
  authMiddleware,
  budgetController.getTransactions,
);
router.post(
  "/:budgetId/transactions",
  authMiddleware,
  validate(transactionSchema),
  budgetController.addTransaction,
);
router.delete(
  "/transactions/:transactionId",
  authMiddleware,
  budgetController.deleteTransaction,
);

export default router;

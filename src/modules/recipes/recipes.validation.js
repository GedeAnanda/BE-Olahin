import { z } from "zod";

export const createRecipeSchema = z.object({
  title: z.string().min(3, "Judul minimal 3 karakter"),
  description: z.string().optional(),
  imageUrl: z.string().url("Format URL tidak valid").optional(),
  budgetIdr: z.number().min(1000, "Budget minimal Rp 1.000"),
  servingSize: z.number().min(1, "Porsi minimal 1"),
  cookTimeMin: z.number().min(1, "Waktu masak minimal 1 menit"),
  isPopular: z.boolean().optional(),
  ingredients: z
    .array(
      z.object({
        name: z.string().min(1, "Nama bahan wajib diisi"),
        quantity: z.string().min(1, "Jumlah wajib diisi"),
        unit: z.string().optional(),
      }),
    )
    .min(1, "Minimal 1 bahan"),
  steps: z
    .array(
      z.object({
        stepNumber: z.number().min(1),
        instruction: z.string().min(1, "Instruksi wajib diisi"),
        imageUrl: z.string().url().optional(),
      }),
    )
    .min(1, "Minimal 1 langkah"),
});

export const updateRecipeSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().optional(),
  imageUrl: z.string().url().optional(),
  budgetIdr: z.number().min(1000).optional(),
  servingSize: z.number().min(1).optional(),
  cookTimeMin: z.number().min(1).optional(),
  isPopular: z.boolean().optional(),
});

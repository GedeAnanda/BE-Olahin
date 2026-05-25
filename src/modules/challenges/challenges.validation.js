import { z } from "zod";

export const createChallengeSchema = z.object({
  title: z.string().min(3, "Judul minimal 3 karakter"),
  description: z.string().min(10, "Deskripsi minimal 10 karakter"),
  recipeId: z.string().uuid("Format recipeId tidak valid").optional(),
  weekStart: z.string().datetime("Format tanggal tidak valid"),
  weekEnd: z.string().datetime("Format tanggal tidak valid"),
});




import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter").optional(),
  bio: z.string().optional(),
  avatarUrl: z.string().url("Format URL tidak valid").optional(),
});

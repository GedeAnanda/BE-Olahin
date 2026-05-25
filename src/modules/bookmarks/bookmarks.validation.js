import { z } from 'zod'

export const addBookmarkSchema = z.object({
  recipeId: z.string().uuid('Format recipeId tidak valid')
})


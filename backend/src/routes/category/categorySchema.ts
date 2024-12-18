import { z } from 'zod';

export const createCategorySchema = z.object({
    name: z.string().min(3, "Name must have at least 3 characters"),
    description: z.string().min(10, "Description must have at least 10 characters"),
    image: z.string().url("Image must be a valid URL"),
});

export type CreateCategoryType = z.infer<typeof createCategorySchema>;

export const updateCategorySchema = z.object({
    name: z.string().min(3, "Name must have at least 3 characters").optional(),
    description: z.string().min(10, "Description must have at least 10 characters").optional(),
    image: z.string().url("Image must be a valid URL").optional(),
});

export type UpdateCategoryType = z.infer<typeof updateCategorySchema>;

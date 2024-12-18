import { z } from 'zod';


export const createTagSchema = z.object({
    name: z.string().min(3, "Name must have at least 3 characters"),
    description: z.string().min(10, "Description must have at least 10 characters"),
});

export type CreateTagType = z.infer<typeof createTagSchema>;

export const updateTagSchema = z.object({
    name: z.string().min(3, "Name must have at least 3 characters").optional(),
    description: z.string().min(10, "Description must have at least 10 characters").optional(),
});

export type UpdateTagType = z.infer<typeof updateTagSchema>;

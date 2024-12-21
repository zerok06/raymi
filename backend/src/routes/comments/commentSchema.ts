import { z } from 'zod';

export const createCommentSchema = z.object({
    message: z.string().min(1, "El message no puede estar vacío"),
    userId: z.number().int("El ID del usuario debe ser un número entero"),
    eventId: z.number().int("El ID del evento debe ser un número entero"),
});

export const updateCommentSchema = z.object({
    message: z.string().min(1, "El message no puede estar vacío").optional(),
});

export type CreateCommentType = z.infer<typeof createCommentSchema>;
export type UpdateCommentType = z.infer<typeof updateCommentSchema>;

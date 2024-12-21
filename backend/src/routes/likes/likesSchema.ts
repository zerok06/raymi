import { z } from 'zod';

export const likeSchema = z.object({
    userId: z.number().int("El ID del usuario debe ser un número entero"),
    eventId: z.number().int("El ID del evento debe ser un número entero"),
});

export type LikeType = z.infer<typeof likeSchema>;

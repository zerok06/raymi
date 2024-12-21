import { z } from 'zod';

export const createEventSchema = z.object({
    title: z.string().min(3, "Title must have at least 3 characters"),
    images: z.string().url("Images must be a valid URL"),
    description: z.string().min(10, "Description must have at least 10 characters"),
    latitud: z.number(),
    longitud: z.number(),
    fecha: z.string().refine((val) => !isNaN(Date.parse(val)), "Fecha must be a valid date"),
    ubicacion: z.string().min(3, "Ubicacion must have at least 3 characters"),
    userId: z.number().optional(),
    organizacionId: z.number().optional(),
    categories: z.array(z.number()).optional(),
    tags: z.array(z.number()).optional(), // List of tag IDs
});

export type CreateEventType = z.infer<typeof createEventSchema>;

export const updateEventSchema = z.object({
    title: z.string().min(3, "Title must have at least 3 characters").optional(),
    images: z.string().url("Images must be a valid URL").optional(),
    latitud: z.number(),
    longitud: z.number(),
    description: z.string().min(10, "Description must have at least 10 characters").optional(),
    fecha: z.string().refine((val) => !isNaN(Date.parse(val)), "Fecha must be a valid date").optional(),
    ubicacion: z.string().min(3, "Ubicacion must have at least 3 characters").optional(),
    userId: z.number().optional(),
    organizacionId: z.number().optional(),
    categories: z.array(z.number()).optional(),
    tags: z.array(z.number()).optional(),
});

export type UpdateEventType = z.infer<typeof updateEventSchema>;

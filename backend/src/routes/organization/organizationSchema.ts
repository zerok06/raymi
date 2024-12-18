import { z } from 'zod';

/* ------------------- ORGANIZATION SCHEMAS ------------------- */

export const createOrganizationSchema = z.object({
    name: z.string().min(3, "Name must have at least 3 characters"),
    description: z.string().min(10, "Description must have at least 10 characters"),
    image: z.string().url("Image must be a valid URL"),
    banner: z.string().url("Banner must be a valid URL"),
});

export type CreateOrganizationType = z.infer<typeof createOrganizationSchema>;

export const updateOrganizationSchema = z.object({
    name: z.string().min(3, "Name must have at least 3 characters").optional(),
    description: z.string().min(10, "Description must have at least 10 characters").optional(),
    image: z.string().url("Image must be a valid URL").optional(),
    banner: z.string().url("Banner must be a valid URL").optional(),
});

export type UpdateOrganizationType = z.infer<typeof updateOrganizationSchema>;

/* ------------------- INTEREST SCHEMAS ------------------- */

export const createInteresSchema = z.object({
    userId: z.number().int("UserId must be an integer"),
    organizacionId: z.number().int("OrganizacionId must be an integer"),
});

export type CreateInteresType = z.infer<typeof createInteresSchema>;

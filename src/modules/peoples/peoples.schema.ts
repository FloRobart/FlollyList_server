import { z, ZodNumber } from "zod";



/**
 * Schema to validate an ID parameter.
 */
export const IdSchema = z.object({
    id: z.preprocess<unknown, ZodNumber>(
        (val) => typeof val === "string" ? Number(val.trim()) : val,
        z.int().min(1),
    ),
});

/**
 * Schema to validate a people object.
 */
export const PeoplesSchema = z.object({
    id: z.int().min(1),
    people_name: z.string().trim().min(1).max(255),
    people_description: z.string().nullable().default(null),
    people_year: z.int().nullable().default(null),
    link: z.string().trim().max(512).nullable().default(null),

    person_id: z.int().min(1),
    user_id: z.int().min(1),

    created_at: z.string().readonly(),
    updated_at: z.string().readonly(),
});

/**
 * Schema to validate a people object for insertion.
 */
export const PeoplesInsertSchema = PeoplesSchema.extend({
    user_id: PeoplesSchema.shape.user_id.optional(),
}).omit({
    id: true,

    created_at: true,
    updated_at: true,
});

/**
 * Schema to validate a people object for updating.
 */
export const PeoplesUpdateSchema = PeoplesSchema;

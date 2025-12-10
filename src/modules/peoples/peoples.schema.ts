import { z, ZodNumber } from "zod";
import { ZStringDate, ZStringDateNullable } from "../../core/schemas/common.schema";



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
    first_name: z.string().trim().min(1).max(255),
    last_name: z.string().trim().min(1).max(255).nullable().default(null),
    date_of_birth: ZStringDateNullable,

    user_id: z.int().min(1),

    created_at: ZStringDate.readonly(),
    updated_at: ZStringDate.readonly(),
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

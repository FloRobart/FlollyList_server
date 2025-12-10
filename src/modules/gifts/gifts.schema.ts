import { z } from "zod";
import { ZStringDate } from "../../core/schemas/common.schema";



/**
 * Schema to validate a gift object.
 */
export const GiftsSchema = z.object({
    id: z.int().min(1),
    gift_name: z.string().trim().min(1).max(255),
    gift_description: z.string().nullable().default(null),
    gift_year: z.int().nullable().default(null),
    link: z.string().trim().max(2048).nullable().default(null),

    people_id: z.int().min(1),
    user_id: z.int().min(1),

    created_at: ZStringDate.readonly(),
    updated_at: ZStringDate.readonly(),
});

/**
 * Schema to validate a gift object for insertion.
 */
export const GiftsInsertSchema = GiftsSchema.extend({
    user_id: GiftsSchema.shape.user_id.optional(),
}).omit({
    id: true,

    created_at: true,
    updated_at: true,
});

/**
 * Schema to validate a gift object for updating.
 */
export const GiftsUpdateSchema = GiftsSchema;

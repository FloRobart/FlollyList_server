import { z } from "zod";
import { DatabaseIdSchema, nullableTextSchema } from "../../core/schemas/common.schema";



/* Largest price that fits in the NUMERIC(12, 2) column of the database: beyond it, PostgreSQL
   refuses the row, and the client would get a 500 instead of a 400 */
const MAX_PRICE = 9_999_999_999.99;

/* Years accepted from the client for a gift */
const MIN_GIFT_YEAR = 1900;
const MAX_GIFT_YEAR = 2200;



/*========*/
/* SELECT */
/*========*/
/**
 * Schema of a gift, as stored in the database.
 * Lenient on purpose: it also describes the rows imported from the former installation,
 * which were never checked as strictly as a creation is now.
 */
export const GiftsSchema = z.object({
    id: DatabaseIdSchema,
    gift_name: z.string(),
    gift_description: z.string().nullable(),
    gift_year: z.int().nullable(),
    price: z.number().min(0),
    link: z.string().nullable(),

    people_id: DatabaseIdSchema,
    user_id: DatabaseIdSchema,

    created_at: z.date().readonly(),
    updated_at: z.date().readonly(),
});



/*========*/
/* INSERT */
/*========*/
/**
 * Schema of a gift sent by the client, to create it.
 * There is no user_id: the user always comes from the authentication server.
 * The person (people_id) must belong to the user: the repository checks it.
 */
export const GiftsInsertSchema = z.object({
    gift_name: z.string().trim().min(1).max(255),
    gift_description: nullableTextSchema(2000),
    gift_year: z.int().min(MIN_GIFT_YEAR).max(MAX_GIFT_YEAR).nullable().default(null),
    price: z.number().min(0).max(MAX_PRICE).default(0),
    link: nullableTextSchema(2048),

    people_id: DatabaseIdSchema,
});



/*========*/
/* UPDATE */
/*========*/
/**
 * Schema of a gift sent by the client, to replace an existing one: the same fields as a creation.
 */
export const GiftsUpdateSchema = GiftsInsertSchema;

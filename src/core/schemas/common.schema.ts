import { z } from "zod";



/* Largest value of an INTEGER column of PostgreSQL: beyond it, the database refuses the query,
   and the client would get a 500 instead of a 400 */
const MAX_DATABASE_ID = 2_147_483_647;



/**
 * Schema of the identifier of a row of the database.
 */
export const DatabaseIdSchema = z.int().min(1).max(MAX_DATABASE_ID);

/**
 * Schema of the parameters of a URL ending with an identifier, such as "/peoples/12".
 * Only digits are accepted: Number() alone would also read "1e3" or "0x10".
 */
export const IdParamsSchema = z.object({
    id: z.string().trim().regex(/^\d+$/).transform((id) => Number(id)).pipe(DatabaseIdSchema),
});

/**
 * Schema of an optional text sent by the client. A missing, empty or blank text is stored as null.
 * @param maxLength The maximum length of the text, once trimmed
 * @returns The Zod schema of the text
 */
export function nullableTextSchema(maxLength: number) {
    return z.preprocess(
        (text) => (typeof text === "string" && text.trim() === "") ? null : text,
        z.string().trim().max(maxLength).nullable(),
    ).default(null);
}

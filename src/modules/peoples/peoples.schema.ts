import { z } from "zod";
import { DatabaseIdSchema, nullableTextSchema } from "../../core/schemas/common.schema";



/* Oldest date of birth accepted from the client */
const OLDEST_DATE_OF_BIRTH = "1900-01-01";

const ONE_DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;



/*========*/
/* SELECT */
/*========*/
/**
 * Schema of a person, as stored in the database.
 * Lenient on purpose: it also describes the rows imported from the former installation,
 * which were never checked as strictly as a creation is now.
 */
export const PeoplesSchema = z.object({
    id: DatabaseIdSchema,
    first_name: z.string(),
    last_name: z.string().nullable(),
    date_of_birth: z.iso.date().nullable(),

    user_id: DatabaseIdSchema,

    created_at: z.date().readonly(),
    updated_at: z.date().readonly(),
});



/*========*/
/* INSERT */
/*========*/
/**
 * Schema of a date of birth sent by the client, as "YYYY-MM-DD".
 */
const DateOfBirthSchema = z.iso.date().refine(isPossibleDateOfBirth);

/**
 * Schema of a person sent by the client, to create it.
 * There is no user_id: the user always comes from the authentication server.
 */
export const PeoplesInsertSchema = z.object({
    first_name: z.string().trim().min(1).max(255),
    last_name: nullableTextSchema(255),
    date_of_birth: DateOfBirthSchema.nullable().default(null),
});



/*========*/
/* UPDATE */
/*========*/
/**
 * Schema of a person sent by the client, to replace an existing one: the same fields as a creation.
 */
export const PeoplesUpdateSchema = PeoplesInsertSchema;



/*===========*/
/* UTILITIES */
/*===========*/
/**
 * Tells whether a date of birth is possible: not before OLDEST_DATE_OF_BIRTH, nor after tomorrow.
 * Tomorrow rather than today, because the day of the client can already be the next one in UTC.
 * Dates written "YYYY-MM-DD" are in the same order alphabetically and chronologically.
 * @param dateOfBirth The date of birth, as "YYYY-MM-DD"
 * @returns true if the date of birth is possible
 */
function isPossibleDateOfBirth(dateOfBirth: string): boolean {
    const tomorrow = new Date(Date.now() + ONE_DAY_IN_MILLISECONDS).toISOString().slice(0, 10);

    return dateOfBirth >= OLDEST_DATE_OF_BIRTH && dateOfBirth <= tomorrow;
}

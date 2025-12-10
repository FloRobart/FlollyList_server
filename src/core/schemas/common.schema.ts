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
 * Preprocess to convert string to Date.
 */
export const ZStringDate = z.preprocess((val: string | Date) => {
    if (typeof val === "string") { return new Date(val.trim()); }
    return val;
}, z.date());

/**
 * Preprocess to convert string to Date or null.
 */
export const ZStringDateNullable = z.preprocess((val: string | Date | null) => {
  if (typeof val === "string") {
    const s = val.trim();
    return s === "" ? null : new Date(s);
  }
  return val;
}, z.date().nullable().default(null));
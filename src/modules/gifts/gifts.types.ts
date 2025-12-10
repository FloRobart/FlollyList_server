import { z } from "zod";
import * as Schemas from "./gifts.schema";



/**
 * Type representing a gift object.
 */
export type Gift = z.infer<typeof Schemas.GiftsSchema>;

/**
 * Type representing a gift object for insertion.
 */
export type GiftInsert = z.infer<typeof Schemas.GiftsInsertSchema>;

/**
 * Type representing a gift object for updating.
 */
export type GiftUpdate = z.infer<typeof Schemas.GiftsUpdateSchema>;
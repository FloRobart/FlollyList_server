import { z } from "zod";
import { GiftsInsertSchema, GiftsSchema, GiftsUpdateSchema } from "./gifts.schema";



/* SELECT */
export type Gift = z.infer<typeof GiftsSchema>;

/* INSERT */
export type GiftInsert = z.infer<typeof GiftsInsertSchema>;

/* UPDATE */
export type GiftUpdate = z.infer<typeof GiftsUpdateSchema>;

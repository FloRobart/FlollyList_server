import { z } from "zod";
import * as Schemas from "./peoples.schema";



/**
 * Type representing an ID parameter.
 */
export type Id = z.infer<typeof Schemas.IdSchema>;

/**
 * Type representing a people object.
 */
export type People = z.infer<typeof Schemas.PeoplesSchema>;

/**
 * Type representing a people object for insertion.
 */
export type PeopleInsert = z.infer<typeof Schemas.PeoplesInsertSchema>;

/**
 * Type representing a people object for updating.
 */
export type PeopleUpdate = z.infer<typeof Schemas.PeoplesUpdateSchema>;
import { z } from "zod";
import * as Schemas from "./common.schema";



/**
 * Type representing an ID parameter.
 */
export type Id = z.infer<typeof Schemas.IdSchema>;

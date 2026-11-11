import { z } from "zod";
import { PeoplesInsertSchema, PeoplesSchema, PeoplesUpdateSchema } from "./peoples.schema";



/* SELECT */
export type People = z.infer<typeof PeoplesSchema>;

/* INSERT */
export type PeopleInsert = z.infer<typeof PeoplesInsertSchema>;

/* UPDATE */
export type PeopleUpdate = z.infer<typeof PeoplesUpdateSchema>;

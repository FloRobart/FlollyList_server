import type { People, PeopleInsert, PeopleUpdate } from "./peoples.types";

import { AppError } from "../../core/models/AppError.model";
import { Database } from "../../core/models/Database.model";



/*========*/
/* SELECT */
/*========*/
/**
 * Get all peoples for a user.
 * @param userId The ID of the user.
 * @returns An array of People objects.
 * @throws AppError if there is an issue retrieving the peoples.
 */
export async function selectPeoples(userId: number): Promise<People[]> {
    try {
        let query = "SELECT * FROM peoples WHERE user_id = $1;";
        let values = [userId];

        const peoples = await Database.execute<People>({ text: query, values: values });

        return peoples
    } catch (error) {
        throw (error instanceof AppError) ? error : new AppError("Failed to retrieve peoples", 500);
    }
}


/*========*/
/* INSERT */
/*========*/
/**
 * Insert a new people for a user.
 * @param peopleData The people data to insert.
 * @returns The newly created People object.
 * @throws AppError if there is an issue inserting the people.
 */
export async function insertPeoples(peopleData: PeopleInsert): Promise<People> {
    try {
        const keys = Object.keys(peopleData);
        const columns = keys.join(", ");
        const placeholders = keys.map((_, i) => `$${i + 1}`).join(", ");

        const values = keys.map(key => (peopleData as any)[key]);
        const query = `INSERT INTO peoples (${columns}) VALUES (${placeholders}) RETURNING *;`;

        const rows = await Database.execute<People>({ text: query, values });
        if (rows.length === 0) { throw new AppError("No people inserted", 500); }

        return rows[0];
    } catch (error) {
        throw (error instanceof AppError) ? error : new AppError("Failed to insert peoples", 500);
    }
}


/*========*/
/* UPDATE */
/*========*/
/**
 * Update an existing people for a user.
 * @param peopleData The people data to update.
 * @returns The updated People object.
 */
export async function updatePeoples(peopleData: PeopleUpdate): Promise<People> {
    try {
        /* Extract id and user_id, prepare fields to update */
        const { id, user_id, created_at, updated_at, ...fieldsToUpdate } = peopleData;
        const keys = Object.keys(fieldsToUpdate);

        if (!id || !user_id || keys.length === 0) {
            throw new AppError("Missing data to update", 400);
        }

        /* Build SET clause and values */
        const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(", ");
        const values = keys.map(key => (fieldsToUpdate as any)[key]);

        /* Append id and user_id to values for WHERE clause */
        const query = `UPDATE peoples SET ${setClause} WHERE id = $${values.length + 1} AND user_id = $${values.length + 2} RETURNING *;`;
        values.push(id, user_id);

        /* Execute query */
        const rows = await Database.execute<People>({ text: query, values });
        if (rows.length === 0) { throw new AppError("No people updated", 404); }

        return rows[0];
    } catch (error) {
        throw (error instanceof AppError) ? error : new AppError("Failed to update peoples", 500);
    }
}


/*========*/
/* DELETE */
/*========*/
/**
 * Delete an people for a user.
 * @param userId The ID of the user.
 * @param peopleId The ID of the people to delete.
 * @returns The deleted People object.
 * @throws AppError if there is an issue deleting the people.
 */
export async function deletePeoples(userId: number, peopleId: number): Promise<People> {
    try {
        const query = `DELETE FROM peoples WHERE id = $1 AND user_id = $2 RETURNING *;`;
        const values = [peopleId, userId];

        const rows = await Database.execute<People>({ text: query, values });
        if (rows.length === 0) { throw new AppError("No people deleted", 404); }

        return rows[0];
    } catch (error) {
        throw (error instanceof AppError) ? error : new AppError("Failed to delete peoples", 500);
    }
}

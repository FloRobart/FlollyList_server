import type { Gift, GiftInsert, GiftUpdate } from "./gifts.types";

import { AppError } from "../../core/models/AppError.model";
import { Database } from "../../core/models/Database.model";



/*========*/
/* SELECT */
/*========*/
/**
 * Get all gifts for a user.
 * @param userId The ID of the user.
 * @returns An array of Gift objects.
 * @throws AppError if there is an issue retrieving the gifts.
 */
export async function selectGifts(userId: number): Promise<Gift[]> {
    try {
        let query = "SELECT * FROM gifts WHERE user_id = $1;";
        let values = [userId];

        const gifts = await Database.execute<Gift>({ text: query, values: values });

        return gifts
    } catch (error) {
        throw (error instanceof AppError) ? error : new AppError("Failed to retrieve gifts", 500);
    }
}


/*========*/
/* INSERT */
/*========*/
/**
 * Insert a new gift for a user.
 * @param giftData The gift data to insert.
 * @returns The newly created Gift object.
 * @throws AppError if there is an issue inserting the gift.
 */
export async function insertGifts(giftData: GiftInsert): Promise<Gift> {
    try {
        const keys = Object.keys(giftData);
        const columns = keys.join(", ");
        const placeholders = keys.map((_, i) => `$${i + 1}`).join(", ");

        const values = keys.map(key => (giftData as any)[key]);
        const query = `INSERT INTO gifts (${columns}) VALUES (${placeholders}) RETURNING *;`;

        const rows = await Database.execute<Gift>({ text: query, values });
        if (rows.length === 0) { throw new AppError("No gift inserted", 500); }

        return rows[0];
    } catch (error) {
        throw (error instanceof AppError) ? error : new AppError("Failed to insert gifts", 500);
    }
}


/*========*/
/* UPDATE */
/*========*/
/**
 * Update an existing gift for a user.
 * @param giftData The gift data to update.
 * @returns The updated Gift object.
 */
export async function updateGifts(giftData: GiftUpdate): Promise<Gift> {
    try {
        /* Extract id and user_id, prepare fields to update */
        const { id, user_id, created_at, updated_at, ...fieldsToUpdate } = giftData;
        const keys = Object.keys(fieldsToUpdate);

        if (!id || !user_id || keys.length === 0) {
            throw new AppError("Missing data to update", 400);
        }

        /* Build SET clause and values */
        const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(", ");
        const values = keys.map(key => (fieldsToUpdate as any)[key]);

        /* Append id and user_id to values for WHERE clause */
        const query = `UPDATE gifts SET ${setClause} WHERE id = $${values.length + 1} AND user_id = $${values.length + 2} RETURNING *;`;
        values.push(id, user_id);

        /* Execute query */
        const rows = await Database.execute<Gift>({ text: query, values });
        if (rows.length === 0) { throw new AppError("No gift updated", 404); }

        return rows[0];
    } catch (error) {
        throw (error instanceof AppError) ? error : new AppError("Failed to update gifts", 500);
    }
}


/*========*/
/* DELETE */
/*========*/
/**
 * Delete an gift for a user.
 * @param userId The ID of the user.
 * @param giftId The ID of the gift to delete.
 * @returns The deleted Gift object.
 * @throws AppError if there is an issue deleting the gift.
 */
export async function deleteGifts(userId: number, giftId: number): Promise<Gift> {
    try {
        const query = `DELETE FROM gifts WHERE id = $1 AND user_id = $2 RETURNING *;`;
        const values = [giftId, userId];

        const rows = await Database.execute<Gift>({ text: query, values });
        if (rows.length === 0) { throw new AppError("No gift deleted", 404); }

        return rows[0];
    } catch (error) {
        throw (error instanceof AppError) ? error : new AppError("Failed to delete gifts", 500);
    }
}

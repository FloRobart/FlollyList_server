import { AppError } from "../../core/models/AppError.model";
import { Database } from "../../core/models/Database.model";
import { Gift, GiftInsert, GiftUpdate } from "./gifts.types";



/*
 * Every query names the user: a user only ever reaches its own gifts, and can only give
 * a gift to one of its own people. The database checks it a second time, with the foreign key
 * on (people_id, user_id).
 * Database.execute already turns any failure into an AppError, without revealing the database.
 */



/**
 * Row of the gifts table, as returned by PostgreSQL: a NUMERIC column comes as a string,
 * which keeps the exact value of the price.
 */
type GiftRow = Omit<Gift, 'price'> & { price: string };



/*========*/
/* SELECT */
/*========*/
/**
 * Gets all the gifts of a user.
 * @param userId The ID of the user.
 * @returns The gifts of the user, in the order of their creation.
 * @throws AppError if the gifts cannot be retrieved.
 */
export async function selectGifts(userId: number): Promise<Gift[]> {
    const query = "SELECT * FROM gifts WHERE user_id = $1 ORDER BY id;";

    const rows = await Database.execute<GiftRow>({ text: query, values: [userId] });
    return rows.map(toGift);
}

/**
 * Counts the gifts of a user.
 * @param userId The ID of the user.
 * @returns The number of gifts of the user.
 * @throws AppError if the gifts cannot be counted.
 */
export async function countGifts(userId: number): Promise<number> {
    const query = "SELECT count(*)::integer AS count FROM gifts WHERE user_id = $1;";

    const rows = await Database.execute<{ count: number }>({ text: query, values: [userId] });
    return rows[0].count;
}


/*========*/
/* INSERT */
/*========*/
/**
 * Creates a gift for a person of a user.
 * The row is built from the person found for this user: without it, nothing is inserted.
 * The values are cast, because inside a SELECT, PostgreSQL cannot guess their type from the columns.
 * @param userId The ID of the user.
 * @param gift The gift to create.
 * @returns The created gift.
 * @throws AppError 404 if the user has no person with the ID of the gift.
 */
export async function insertGift(userId: number, gift: GiftInsert): Promise<Gift> {
    const query = `
        INSERT INTO gifts (gift_name, gift_description, gift_year, price, link, people_id, user_id)
        SELECT $1::varchar, $2::text, $3::integer, $4::numeric, $5::varchar, peoples.id, peoples.user_id
        FROM peoples
        WHERE peoples.id = $6 AND peoples.user_id = $7
        RETURNING *;
    `;
    const values = [gift.gift_name, gift.gift_description, gift.gift_year, gift.price, gift.link, gift.people_id, userId];

    const rows = await Database.execute<GiftRow>({ text: query, values });
    if (rows.length === 0) { throw new AppError("People not found", 404); }

    return toGift(rows[0]);
}


/*========*/
/* UPDATE */
/*========*/
/**
 * Replaces the fields of a gift of a user, possibly moving it to another of its people.
 * @param userId The ID of the user.
 * @param giftId The ID of the gift to update.
 * @param gift The new fields of the gift.
 * @returns The updated gift.
 * @throws AppError 404 if the user has no gift with this ID, or no person with the ID of the gift.
 */
export async function updateGift(userId: number, giftId: number, gift: GiftUpdate): Promise<Gift> {
    const query = `
        UPDATE gifts
        SET gift_name = $1, gift_description = $2, gift_year = $3, price = $4, link = $5, people_id = $6
        WHERE id = $7 AND user_id = $8
            AND EXISTS (SELECT 1 FROM peoples WHERE peoples.id = $6 AND peoples.user_id = $8)
        RETURNING *;
    `;
    const values = [gift.gift_name, gift.gift_description, gift.gift_year, gift.price, gift.link, gift.people_id, giftId, userId];

    const rows = await Database.execute<GiftRow>({ text: query, values });
    if (rows.length === 0) { throw new AppError("No gift updated", 404); }

    return toGift(rows[0]);
}


/*========*/
/* DELETE */
/*========*/
/**
 * Deletes a gift of a user.
 * @param userId The ID of the user.
 * @param giftId The ID of the gift to delete.
 * @returns The deleted gift.
 * @throws AppError 404 if the user has no gift with this ID.
 */
export async function deleteGift(userId: number, giftId: number): Promise<Gift> {
    const query = "DELETE FROM gifts WHERE id = $1 AND user_id = $2 RETURNING *;";

    const rows = await Database.execute<GiftRow>({ text: query, values: [giftId, userId] });
    if (rows.length === 0) { throw new AppError("No gift deleted", 404); }

    return toGift(rows[0]);
}



/*===========*/
/* UTILITIES */
/*===========*/
/**
 * Converts a row of the gifts table into a gift, with its price as a number.
 * @param row The row returned by PostgreSQL.
 * @returns The gift.
 */
function toGift(row: GiftRow): Gift {
    return { ...row, price: Number(row.price) };
}

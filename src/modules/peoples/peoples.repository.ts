import { AppError } from "../../core/models/AppError.model";
import { Database } from "../../core/models/Database.model";
import { People, PeopleInsert, PeopleUpdate } from "./peoples.types";



/*
 * Every query names the user: a user only ever reaches its own people.
 * Database.execute already turns any failure into an AppError, without revealing the database.
 */



/*========*/
/* SELECT */
/*========*/
/**
 * Gets all the people of a user.
 * @param userId The ID of the user.
 * @returns The people of the user, in the order of their creation.
 * @throws AppError if the people cannot be retrieved.
 */
export async function selectPeoples(userId: number): Promise<People[]> {
    const query = "SELECT * FROM peoples WHERE user_id = $1 ORDER BY id;";

    return await Database.execute<People>({ text: query, values: [userId] });
}

/**
 * Counts the people of a user.
 * @param userId The ID of the user.
 * @returns The number of people of the user.
 * @throws AppError if the people cannot be counted.
 */
export async function countPeoples(userId: number): Promise<number> {
    const query = "SELECT count(*)::integer AS count FROM peoples WHERE user_id = $1;";

    const rows = await Database.execute<{ count: number }>({ text: query, values: [userId] });
    return rows[0].count;
}


/*========*/
/* INSERT */
/*========*/
/**
 * Creates a person for a user.
 * @param userId The ID of the user.
 * @param people The person to create.
 * @returns The created person.
 * @throws AppError if the person cannot be created.
 */
export async function insertPeople(userId: number, people: PeopleInsert): Promise<People> {
    const query = `
        INSERT INTO peoples (first_name, last_name, date_of_birth, user_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;
    const values = [people.first_name, people.last_name, people.date_of_birth, userId];

    const rows = await Database.execute<People>({ text: query, values });
    if (rows.length === 0) { throw new AppError("No people inserted", 500); }

    return rows[0];
}


/*========*/
/* UPDATE */
/*========*/
/**
 * Replaces the fields of a person of a user.
 * @param userId The ID of the user.
 * @param peopleId The ID of the person to update.
 * @param people The new fields of the person.
 * @returns The updated person.
 * @throws AppError 404 if the user has no person with this ID.
 */
export async function updatePeople(userId: number, peopleId: number, people: PeopleUpdate): Promise<People> {
    const query = `
        UPDATE peoples
        SET first_name = $1, last_name = $2, date_of_birth = $3
        WHERE id = $4 AND user_id = $5
        RETURNING *;
    `;
    const values = [people.first_name, people.last_name, people.date_of_birth, peopleId, userId];

    const rows = await Database.execute<People>({ text: query, values });
    if (rows.length === 0) { throw new AppError("No people updated", 404); }

    return rows[0];
}


/*========*/
/* DELETE */
/*========*/
/**
 * Deletes a person of a user, with all its gifts (ON DELETE CASCADE in the database).
 * @param userId The ID of the user.
 * @param peopleId The ID of the person to delete.
 * @returns The deleted person.
 * @throws AppError 404 if the user has no person with this ID.
 */
export async function deletePeople(userId: number, peopleId: number): Promise<People> {
    const query = "DELETE FROM peoples WHERE id = $1 AND user_id = $2 RETURNING *;";

    const rows = await Database.execute<People>({ text: query, values: [peopleId, userId] });
    if (rows.length === 0) { throw new AppError("No people deleted", 404); }

    return rows[0];
}

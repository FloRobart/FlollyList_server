import type { People, PeopleInsert, PeopleUpdate } from './peoples.types';

import { ZodError } from 'zod';
import { AppError } from '../../core/models/AppError.model';
import * as PeoplesRepository from './peoples.repository';
import { PeoplesSchema } from './peoples.schema';



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
        const peoples = await PeoplesRepository.selectPeoples(userId);
        return PeoplesSchema.array().parse(peoples);
    } catch (error) {
        throw (error instanceof ZodError) ? new AppError("Failed to parse peoples", 500) : error;
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
        const peoples = await PeoplesRepository.insertPeoples(peopleData);
        return PeoplesSchema.parse(peoples);
    } catch (error) {
        console.error("Insert people error:", error);
        throw (error instanceof ZodError) ? new AppError("Failed to parse people (people inserted successfully)", 500) : error;
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
        const peoples = await PeoplesRepository.updatePeoples(peopleData);
        return PeoplesSchema.parse(peoples);
    } catch (error) {
        throw (error instanceof ZodError) ? new AppError("Failed to parse people (people updated successfully)", 500) : error;
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
        const peoples = await PeoplesRepository.deletePeoples(userId, peopleId);
        return PeoplesSchema.parse(peoples);
    } catch (error) {
        throw (error instanceof ZodError) ? new AppError("Failed to parse people (people deleted successfully)", 500) : error;
    }
}

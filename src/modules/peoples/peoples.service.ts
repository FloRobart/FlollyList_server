import { AppError } from '../../core/models/AppError.model';
import * as PeoplesRepository from './peoples.repository';
import { PeoplesSchema } from './peoples.schema';
import { People, PeopleInsert, PeopleUpdate } from './peoples.types';



/* Far above the needs of a family: only there so that a single account cannot fill the database */
export const MAX_PEOPLES_PER_USER = 500;



/*========*/
/* SELECT */
/*========*/
/**
 * Gets all the people of a user.
 * @param userId The ID of the user.
 * @returns The people of the user.
 * @throws AppError if the people cannot be retrieved.
 */
export async function selectPeoples(userId: number): Promise<People[]> {
    const peoples = await PeoplesRepository.selectPeoples(userId);

    const parsedPeoples = PeoplesSchema.array().safeParse(peoples);
    if (!parsedPeoples.success) { throw new AppError("Failed to parse peoples", 500); }

    return parsedPeoples.data;
}


/*========*/
/* INSERT */
/*========*/
/**
 * Creates a person for a user.
 * @param userId The ID of the user.
 * @param people The person to create.
 * @returns The created person.
 * @throws AppError 403 if the user already has MAX_PEOPLES_PER_USER people.
 */
export async function insertPeople(userId: number, people: PeopleInsert): Promise<People> {
    await checkPeoplesLimit(userId);

    const insertedPeople = await PeoplesRepository.insertPeople(userId, people);
    return parsePeople(insertedPeople, "inserted");
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
    const updatedPeople = await PeoplesRepository.updatePeople(userId, peopleId, people);
    return parsePeople(updatedPeople, "updated");
}


/*========*/
/* DELETE */
/*========*/
/**
 * Deletes a person of a user, with all its gifts.
 * @param userId The ID of the user.
 * @param peopleId The ID of the person to delete.
 * @returns The deleted person.
 * @throws AppError 404 if the user has no person with this ID.
 */
export async function deletePeople(userId: number, peopleId: number): Promise<People> {
    const deletedPeople = await PeoplesRepository.deletePeople(userId, peopleId);
    return parsePeople(deletedPeople, "deleted");
}



/*===========*/
/* UTILITIES */
/*===========*/
/**
 * Refuses a new person to a user who already has MAX_PEOPLES_PER_USER people.
 * @param userId The ID of the user.
 * @throws AppError 403 if the user has reached the limit.
 */
async function checkPeoplesLimit(userId: number): Promise<void> {
    const peoplesCount = await PeoplesRepository.countPeoples(userId);
    if (peoplesCount < MAX_PEOPLES_PER_USER) return;

    throw new AppError(`A user cannot have more than ${MAX_PEOPLES_PER_USER} peoples`, 403);
}

/**
 * Checks a person written in the database, before it is sent to the client.
 * @param people The person returned by the repository.
 * @param action What was done to the person, for the error message.
 * @returns The checked person.
 * @throws AppError 500 if the person does not match the schema, although the write succeeded.
 */
function parsePeople(people: People, action: string): People {
    const parsedPeople = PeoplesSchema.safeParse(people);
    if (!parsedPeople.success) { throw new AppError(`Failed to parse people (people ${action} successfully)`, 500); }

    return parsedPeople.data;
}

import { Request, Response, NextFunction } from 'express';
import * as PeoplesService from './peoples.service';
import { PeopleInsert, PeopleUpdate } from './peoples.types';



/*========*/
/* SELECT */
/*========*/
/**
 * Gets all the people of the user.
 * @param req.body.user The user, added by the authorization middleware.
 * @param res The response: 200 with the people, an empty array if there are none.
 * @param next The next middleware function.
 */
export const selectPeoples = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId: number = req.body.user.id;

        const peoples = await PeoplesService.selectPeoples(userId);
        res.status(200).json(peoples);
    } catch (error) {
        next(error);
    }
};


/*========*/
/* INSERT */
/*========*/
/**
 * Creates a person for the user.
 * @param req.body.user The user, added by the authorization middleware.
 * @param req.body.validatedData.body The validated person to create.
 * @param res The response: 201 with the created person.
 * @param next The next middleware function.
 */
export const insertPeople = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId: number = req.body.user.id;
        const people: PeopleInsert = req.body.validatedData.body;

        const insertedPeople = await PeoplesService.insertPeople(userId, people);
        res.status(201).json(insertedPeople);
    } catch (error) {
        next(error);
    }
};


/*========*/
/* UPDATE */
/*========*/
/**
 * Replaces the fields of a person of the user.
 * @param req.body.user The user, added by the authorization middleware.
 * @param req.body.validatedData.params.id The ID of the person to update.
 * @param req.body.validatedData.body The validated new fields of the person.
 * @param res The response: 200 with the updated person.
 * @param next The next middleware function.
 */
export const updatePeople = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId: number = req.body.user.id;
        const peopleId: number = req.body.validatedData.params.id;
        const people: PeopleUpdate = req.body.validatedData.body;

        const updatedPeople = await PeoplesService.updatePeople(userId, peopleId, people);
        res.status(200).json(updatedPeople);
    } catch (error) {
        next(error);
    }
};


/*========*/
/* DELETE */
/*========*/
/**
 * Deletes a person of the user, with all its gifts.
 * @param req.body.user The user, added by the authorization middleware.
 * @param req.body.validatedData.params.id The ID of the person to delete.
 * @param res The response: 200 with the deleted person.
 * @param next The next middleware function.
 */
export const deletePeople = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId: number = req.body.user.id;
        const peopleId: number = req.body.validatedData.params.id;

        const deletedPeople = await PeoplesService.deletePeople(userId, peopleId);
        res.status(200).json(deletedPeople);
    } catch (error) {
        next(error);
    }
};

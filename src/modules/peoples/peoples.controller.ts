import type { PeopleInsert, PeopleUpdate } from './peoples.types';

import { Request, Response, NextFunction } from 'express';
import * as PeoplesService from './peoples.service';



/*========*/
/* SELECT */
/*========*/
/**
 * Get all peoples for a user.
 * @param req.body.user The user object containing the user ID.
 * @param res The response object.
 * @param next The next middleware function.
 */
export const selectPeoples = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId: number = req.body.user.id;

        const peoples = await PeoplesService.selectPeoples(userId);
        res.status(peoples.length ? 200 : 204).json(peoples);
    } catch (error) {
        next(error);
    }
};


/*========*/
/* INSERT */
/*========*/
/**
 * Insert a new people for a user.
 * @param req.body.user The user object containing the user ID.
 * @param req.body.validatedData.body The validated people data to insert.
 * @param res The response object.
 * @param next The next middleware function.
 */
export const insertPeoples = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const peopleData: PeopleInsert = { ...req.body.validatedData.body, user_id: req.body.user.id };

        const newPeople = await PeoplesService.insertPeoples(peopleData);
        res.status(201).json(newPeople);
    } catch (error) {
        next(error);
    }
};


/*========*/
/* UPDATE */
/*========*/
/**
 * Update an existing people for a user.
 * @param req.body.user The user object containing the user ID.
 * @param req.body.validatedData.body The validated people data to update.
 * @param res The response object.
 * @param next The next middleware function.
 */
export const updatePeoples = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const peopleData: PeopleUpdate = { ...req.body.validatedData.body, id: req.body.validatedData.params.id, user_id: req.body.user.id };

        const peoples = await PeoplesService.updatePeoples(peopleData);
        res.status(200).json(peoples);
    } catch (error) {
        next(error);
    }
};


/*========*/
/* DELETE */
/*========*/
/**
 * Delete an people for a user.
 * @param req.body.user The user object containing the user ID.
 * @param req.body.validatedData.params.id The ID of the people to delete.
 * @param res The response object.
 * @param next The next middleware function.
 */
export const deletePeoples = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId: number = req.body.user.id;
        const peopleId: number = req.body.validatedData.params.id;

        const peoples = await PeoplesService.deletePeoples(userId, peopleId);
        res.status(200).json(peoples);
    } catch (error) {
        next(error);
    }
};

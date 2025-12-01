import type { GiftInsert, GiftUpdate } from './gifts.types';

import { Request, Response, NextFunction } from 'express';
import * as GiftsService from './gifts.service';



/*========*/
/* SELECT */
/*========*/
/**
 * Get all gifts for a user.
 * @param req.body.user The user object containing the user ID.
 * @param res The response object.
 * @param next The next middleware function.
 */
export const selectGifts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId: number = req.body.user.id;

        const gifts = await GiftsService.selectGifts(userId);
        res.status(gifts.length ? 200 : 204).json(gifts);
    } catch (error) {
        next(error);
    }
};


/*========*/
/* INSERT */
/*========*/
/**
 * Insert a new gift for a user.
 * @param req.body.user The user object containing the user ID.
 * @param req.body.validatedData.body The validated gift data to insert.
 * @param res The response object.
 * @param next The next middleware function.
 */
export const insertGifts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const giftData: GiftInsert = { ...req.body.validatedData.body, user_id: req.body.user.id };

        const newGift = await GiftsService.insertGifts(giftData);
        res.status(201).json(newGift);
    } catch (error) {
        next(error);
    }
};


/*========*/
/* UPDATE */
/*========*/
/**
 * Update an existing gift for a user.
 * @param req.body.user The user object containing the user ID.
 * @param req.body.validatedData.body The validated gift data to update.
 * @param res The response object.
 * @param next The next middleware function.
 */
export const updateGifts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const giftData: GiftUpdate = { ...req.body.validatedData.body, id: req.body.validatedData.params.id, user_id: req.body.user.id };

        const gifts = await GiftsService.updateGifts(giftData);
        res.status(200).json(gifts);
    } catch (error) {
        next(error);
    }
};


/*========*/
/* DELETE */
/*========*/
/**
 * Delete an gift for a user.
 * @param req.body.user The user object containing the user ID.
 * @param req.body.validatedData.params.id The ID of the gift to delete.
 * @param res The response object.
 * @param next The next middleware function.
 */
export const deleteGifts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId: number = req.body.user.id;
        const giftId: number = req.body.validatedData.params.id;

        const gifts = await GiftsService.deleteGifts(userId, giftId);
        res.status(200).json(gifts);
    } catch (error) {
        next(error);
    }
};

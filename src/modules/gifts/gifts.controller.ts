import { Request, Response, NextFunction } from 'express';
import * as GiftsService from './gifts.service';
import { GiftInsert, GiftUpdate } from './gifts.types';



/*========*/
/* SELECT */
/*========*/
/**
 * Gets all the gifts of the user.
 * @param req.body.user The user, added by the authorization middleware.
 * @param res The response: 200 with the gifts, an empty array if there are none.
 * @param next The next middleware function.
 */
export const selectGifts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId: number = req.body.user.id;

        const gifts = await GiftsService.selectGifts(userId);
        res.status(200).json(gifts);
    } catch (error) {
        next(error);
    }
};


/*========*/
/* INSERT */
/*========*/
/**
 * Creates a gift for a person of the user.
 * @param req.body.user The user, added by the authorization middleware.
 * @param req.body.validatedData.body The validated gift to create.
 * @param res The response: 201 with the created gift.
 * @param next The next middleware function.
 */
export const insertGift = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId: number = req.body.user.id;
        const gift: GiftInsert = req.body.validatedData.body;

        const insertedGift = await GiftsService.insertGift(userId, gift);
        res.status(201).json(insertedGift);
    } catch (error) {
        next(error);
    }
};


/*========*/
/* UPDATE */
/*========*/
/**
 * Replaces the fields of a gift of the user.
 * @param req.body.user The user, added by the authorization middleware.
 * @param req.body.validatedData.params.id The ID of the gift to update.
 * @param req.body.validatedData.body The validated new fields of the gift.
 * @param res The response: 200 with the updated gift.
 * @param next The next middleware function.
 */
export const updateGift = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId: number = req.body.user.id;
        const giftId: number = req.body.validatedData.params.id;
        const gift: GiftUpdate = req.body.validatedData.body;

        const updatedGift = await GiftsService.updateGift(userId, giftId, gift);
        res.status(200).json(updatedGift);
    } catch (error) {
        next(error);
    }
};


/*========*/
/* DELETE */
/*========*/
/**
 * Deletes a gift of the user.
 * @param req.body.user The user, added by the authorization middleware.
 * @param req.body.validatedData.params.id The ID of the gift to delete.
 * @param res The response: 200 with the deleted gift.
 * @param next The next middleware function.
 */
export const deleteGift = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId: number = req.body.user.id;
        const giftId: number = req.body.validatedData.params.id;

        const deletedGift = await GiftsService.deleteGift(userId, giftId);
        res.status(200).json(deletedGift);
    } catch (error) {
        next(error);
    }
};

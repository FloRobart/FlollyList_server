import type { Gift, GiftInsert, GiftUpdate } from './gifts.types';

import { ZodError } from 'zod';
import { AppError } from '../../core/models/AppError.model';
import * as GiftsRepository from './gifts.repository';
import { GiftsSchema } from './gifts.schema';



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
        const gifts = await GiftsRepository.selectGifts(userId);

        // convert Date to string if necessary
        gifts.forEach(gift => {
            gift.created_at = (gift.created_at as any)?.toISOString();
            gift.updated_at = (gift.updated_at as any)?.toISOString();
        });

        return GiftsSchema.array().parse(gifts);
    } catch (error) {
        throw (error instanceof ZodError) ? new AppError("Failed to parse gifts", 500) : error;
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
        const gifts = await GiftsRepository.insertGifts(giftData);

        // convert Date to string if necessary
        gifts.created_at = (gifts.created_at as any)?.toISOString();
        gifts.updated_at = (gifts.updated_at as any)?.toISOString();

        return GiftsSchema.parse(gifts);
    } catch (error) {
        console.debug("Insert gift error:", error);
        throw (error instanceof ZodError) ? new AppError("Failed to parse gift (gift inserted successfully)", 500) : error;
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
        const gifts = await GiftsRepository.updateGifts(giftData);

        // convert Date to string if necessary
        gifts.created_at = (gifts.created_at as any)?.toISOString();
        gifts.updated_at = (gifts.updated_at as any)?.toISOString();

        return GiftsSchema.parse(gifts);
    } catch (error) {
        throw (error instanceof ZodError) ? new AppError("Failed to parse gift (gift updated successfully)", 500) : error;
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
        const gifts = await GiftsRepository.deleteGifts(userId, giftId);
        return GiftsSchema.parse(gifts);
    } catch (error) {
        throw (error instanceof ZodError) ? new AppError("Failed to parse gift (gift deleted successfully)", 500) : error;
    }
}

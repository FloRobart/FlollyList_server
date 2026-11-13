import { AppError } from '../../core/models/AppError.model';
import * as GiftsRepository from './gifts.repository';
import { GiftsSchema } from './gifts.schema';
import { Gift, GiftInsert, GiftUpdate } from './gifts.types';



/* Far above the needs of a family over many years: only there so that a single account cannot fill the database */
export const MAX_GIFTS_PER_USER = 10_000;



/*========*/
/* SELECT */
/*========*/
/**
 * Gets all the gifts of a user.
 * @param userId The ID of the user.
 * @returns The gifts of the user.
 * @throws AppError if the gifts cannot be retrieved.
 */
export async function selectGifts(userId: number): Promise<Gift[]> {
    const gifts = await GiftsRepository.selectGifts(userId);

    const parsedGifts = GiftsSchema.array().safeParse(gifts);
    if (!parsedGifts.success) { throw new AppError("Failed to parse gifts", 500); }

    return parsedGifts.data;
}


/*========*/
/* INSERT */
/*========*/
/**
 * Creates a gift for a person of a user.
 * @param userId The ID of the user.
 * @param gift The gift to create.
 * @returns The created gift.
 * @throws AppError 403 if the user already has MAX_GIFTS_PER_USER gifts, 404 if the person is not one of its people.
 */
export async function insertGift(userId: number, gift: GiftInsert): Promise<Gift> {
    await checkGiftsLimit(userId);

    const insertedGift = await GiftsRepository.insertGift(userId, gift);
    return parseGift(insertedGift, "inserted");
}


/*========*/
/* UPDATE */
/*========*/
/**
 * Replaces the fields of a gift of a user.
 * @param userId The ID of the user.
 * @param giftId The ID of the gift to update.
 * @param gift The new fields of the gift.
 * @returns The updated gift.
 * @throws AppError 404 if the user has no gift with this ID, or no person with the ID of the gift.
 */
export async function updateGift(userId: number, giftId: number, gift: GiftUpdate): Promise<Gift> {
    const updatedGift = await GiftsRepository.updateGift(userId, giftId, gift);
    return parseGift(updatedGift, "updated");
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
    const deletedGift = await GiftsRepository.deleteGift(userId, giftId);
    return parseGift(deletedGift, "deleted");
}



/*===========*/
/* UTILITIES */
/*===========*/
/**
 * Refuses a new gift to a user who already has MAX_GIFTS_PER_USER gifts.
 * @param userId The ID of the user.
 * @throws AppError 403 if the user has reached the limit.
 */
async function checkGiftsLimit(userId: number): Promise<void> {
    const giftsCount = await GiftsRepository.countGifts(userId);
    if (giftsCount < MAX_GIFTS_PER_USER) return;

    throw new AppError(`A user cannot have more than ${MAX_GIFTS_PER_USER} gifts`, 403);
}

/**
 * Checks a gift written in the database, before it is sent to the client.
 * @param gift The gift returned by the repository.
 * @param action What was done to the gift, for the error message.
 * @returns The checked gift.
 * @throws AppError 500 if the gift does not match the schema, although the write succeeded.
 */
function parseGift(gift: Gift, action: string): Gift {
    const parsedGift = GiftsSchema.safeParse(gift);
    if (!parsedGift.success) { throw new AppError(`Failed to parse gift (gift ${action} successfully)`, 500); }

    return parsedGift.data;
}

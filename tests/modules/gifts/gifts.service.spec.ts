import * as GiftsRepository from '../../../src/modules/gifts/gifts.repository';
import * as GiftsService from '../../../src/modules/gifts/gifts.service';
import { Gift, GiftInsert } from '../../../src/modules/gifts/gifts.types';



const USER_ID = 42;

const GIFT_INSERT: GiftInsert = {
    gift_name: 'Puzzle',
    gift_description: null,
    gift_year: 2026,
    price: 24.99,
    link: null,
    people_id: 3,
};

const GIFT_ROW: Gift = {
    id: 1,
    ...GIFT_INSERT,
    user_id: USER_ID,
    created_at: new Date('2026-11-01T10:00:00.000Z'),
    updated_at: new Date('2026-11-01T10:00:00.000Z'),
};



/**
 * Gifts service tests
 */
describe('Gifts service tests', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });


    it('Creates a gift while the user is under the limit', async () => {
        jest.spyOn(GiftsRepository, 'countGifts').mockResolvedValue(GiftsService.MAX_GIFTS_PER_USER - 1);
        const insertMock = jest.spyOn(GiftsRepository, 'insertGift').mockResolvedValue(GIFT_ROW);

        await expect(GiftsService.insertGift(USER_ID, GIFT_INSERT)).resolves.toEqual(GIFT_ROW);
        expect(insertMock).toHaveBeenCalledWith(USER_ID, GIFT_INSERT);
    });


    it('Refuses a new gift with 403 once the user has reached the limit', async () => {
        jest.spyOn(GiftsRepository, 'countGifts').mockResolvedValue(GiftsService.MAX_GIFTS_PER_USER);
        const insertMock = jest.spyOn(GiftsRepository, 'insertGift');

        await expect(GiftsService.insertGift(USER_ID, GIFT_INSERT)).rejects.toMatchObject({ httpStatus: 403 });
        expect(insertMock).not.toHaveBeenCalled();
    });


    it('Answers 500 without the details when the database returns an unexpected row', async () => {
        jest.spyOn(GiftsRepository, 'deleteGift').mockResolvedValue({ ...GIFT_ROW, price: Number.NaN });

        await expect(GiftsService.deleteGift(USER_ID, GIFT_ROW.id)).rejects.toMatchObject({ httpStatus: 500 });
    });
});

import { Database } from '../../../src/core/models/Database.model';
import * as GiftsRepository from '../../../src/modules/gifts/gifts.repository';
import { GiftInsert } from '../../../src/modules/gifts/gifts.types';



const USER_ID = 42;
const GIFT_ID = 5;
const PEOPLE_ID = 3;

const GIFT: GiftInsert = {
    gift_name: 'Puzzle',
    gift_description: null,
    gift_year: 2026,
    price: 24.99,
    link: null,
    people_id: PEOPLE_ID,
};



/**
 * Gifts repository tests: a user only reaches its own gifts, and only gives gifts to its own people.
 */
describe('Gifts repository tests', () => {
    let executeMock: jest.SpyInstance;


    beforeEach(() => {
        /* PostgreSQL returns the NUMERIC price as a string */
        executeMock = jest.spyOn(Database, 'execute').mockResolvedValue([{ id: GIFT_ID, user_id: USER_ID, price: '24.99' }]);
    });


    afterEach(() => {
        jest.restoreAllMocks();
    });


    it('Selects only the gifts of the user, with their price as a number', async () => {
        const gifts = await GiftsRepository.selectGifts(USER_ID);

        expect(executeMock).toHaveBeenCalledWith({ text: expect.stringContaining('WHERE user_id = $1'), values: [USER_ID] });
        expect(gifts[0].price).toBe(24.99);
    });


    it('Creates a gift only for a person of the user', async () => {
        await GiftsRepository.insertGift(USER_ID, GIFT);

        const query = executeMock.mock.calls[0][0];
        expect(query.text).toContain('FROM peoples');
        expect(query.text).toContain('WHERE peoples.id = $6 AND peoples.user_id = $7');
        expect(query.values.slice(-2)).toEqual([PEOPLE_ID, USER_ID]);
    });


    it('Answers 404 when the person is not one of the people of the user', async () => {
        executeMock.mockResolvedValue([]);

        await expect(GiftsRepository.insertGift(USER_ID, GIFT)).rejects.toMatchObject({ httpStatus: 404 });
    });


    it('Updates a gift only if it belongs to the user, and only towards a person of the user', async () => {
        await GiftsRepository.updateGift(USER_ID, GIFT_ID, GIFT);

        const query = executeMock.mock.calls[0][0];
        expect(query.text).toContain('WHERE id = $7 AND user_id = $8');
        expect(query.text).toContain('SELECT 1 FROM peoples WHERE peoples.id = $6 AND peoples.user_id = $8');
        expect(query.values[5]).toBe(PEOPLE_ID);
        expect(query.values.slice(-2)).toEqual([GIFT_ID, USER_ID]);
    });


    it('Deletes a gift only if it belongs to the user', async () => {
        await GiftsRepository.deleteGift(USER_ID, GIFT_ID);

        expect(executeMock).toHaveBeenCalledWith({ text: expect.stringContaining('WHERE id = $1 AND user_id = $2'), values: [GIFT_ID, USER_ID] });
    });


    it('Answers 404 when the user has no gift with this ID', async () => {
        executeMock.mockResolvedValue([]);

        await expect(GiftsRepository.updateGift(USER_ID, GIFT_ID, GIFT)).rejects.toMatchObject({ httpStatus: 404 });
        await expect(GiftsRepository.deleteGift(USER_ID, GIFT_ID)).rejects.toMatchObject({ httpStatus: 404 });
    });
});

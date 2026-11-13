import { GiftsInsertSchema, GiftsSchema } from '../../../src/modules/gifts/gifts.schema';



const VALID_GIFT_INSERT = {
    gift_name: 'Puzzle',
    gift_description: '1000 pièces',
    gift_year: 2026,
    price: 24.99,
    link: 'https://example.com/puzzle',
    people_id: 3,
};



/**
 * Schema of a gift sent by the client
 */
describe('Gifts insert schema tests', () => {
    it('Accepts a complete gift', () => {
        expect(GiftsInsertSchema.parse(VALID_GIFT_INSERT)).toEqual(VALID_GIFT_INSERT);
    });


    it('Only requires the name and the person', () => {
        expect(GiftsInsertSchema.parse({ gift_name: 'Puzzle', people_id: 3 })).toEqual({
            gift_name: 'Puzzle',
            gift_description: null,
            gift_year: null,
            price: 0,
            link: null,
            people_id: 3,
        });
    });


    it('Stores the empty texts as null', () => {
        const gift = GiftsInsertSchema.parse({ ...VALID_GIFT_INSERT, gift_description: '', link: '  ' });

        expect(gift.gift_description).toBeNull();
        expect(gift.link).toBeNull();
    });


    it('Ignores the user sent by the client', () => {
        const gift = GiftsInsertSchema.parse({ ...VALID_GIFT_INSERT, user_id: 1 });

        expect(gift).not.toHaveProperty('user_id');
    });


    it('Refuses an invalid gift', () => {
        const invalidGifts = [
            { ...VALID_GIFT_INSERT, gift_name: ' ' },
            { ...VALID_GIFT_INSERT, gift_name: 'a'.repeat(256) },
            { ...VALID_GIFT_INSERT, gift_description: 'a'.repeat(2001) },
            { ...VALID_GIFT_INSERT, gift_year: 1899 },
            { ...VALID_GIFT_INSERT, gift_year: 2026.5 },
            { ...VALID_GIFT_INSERT, gift_year: '2026' },
            { ...VALID_GIFT_INSERT, price: -1 },
            { ...VALID_GIFT_INSERT, price: 10_000_000_000 },
            { ...VALID_GIFT_INSERT, price: '24.99' },
            { ...VALID_GIFT_INSERT, link: 'a'.repeat(2049) },
            { ...VALID_GIFT_INSERT, people_id: 0 },
            { ...VALID_GIFT_INSERT, people_id: undefined },
        ];

        for (const gift of invalidGifts) {
            expect(GiftsInsertSchema.safeParse(gift).success).toBe(false);
        }
    });
});



/**
 * Schema of a gift read from the database
 */
describe('Gifts schema tests', () => {
    it('Accepts a row of the database', () => {
        const row = {
            id: 1,
            ...VALID_GIFT_INSERT,
            user_id: 42,
            created_at: new Date(),
            updated_at: new Date(),
        };

        expect(GiftsSchema.parse(row)).toEqual(row);
    });
});

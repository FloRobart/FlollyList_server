import { IdParamsSchema, nullableTextSchema } from '../../../src/core/schemas/common.schema';



/**
 * Schema of the identifier in the URL
 */
describe('Id parameters schema tests', () => {
    it('Converts the identifier of the URL into a number', () => {
        expect(IdParamsSchema.parse({ id: '12' })).toEqual({ id: 12 });
        expect(IdParamsSchema.parse({ id: ' 7 ' })).toEqual({ id: 7 });
    });


    it('Refuses anything else than a positive integer written with digits', () => {
        const invalidIds = ['0', '-1', '1.5', '1e3', '0x10', 'abc', '', '2147483648'];

        for (const id of invalidIds) {
            expect(IdParamsSchema.safeParse({ id }).success).toBe(false);
        }
    });
});



/**
 * Schema of an optional text
 */
describe('Nullable text schema tests', () => {
    const TextSchema = nullableTextSchema(10);


    it('Stores a missing, empty or blank text as null', () => {
        expect(TextSchema.parse(undefined)).toBeNull();
        expect(TextSchema.parse(null)).toBeNull();
        expect(TextSchema.parse('')).toBeNull();
        expect(TextSchema.parse('   ')).toBeNull();
    });


    it('Trims the text', () => {
        expect(TextSchema.parse('  Martin  ')).toBe('Martin');
    });


    it('Refuses a text longer than the limit, once trimmed', () => {
        expect(TextSchema.parse('  1234567890  ')).toBe('1234567890');
        expect(TextSchema.safeParse('12345678901').success).toBe(false);
    });


    it('Refuses what is not a text', () => {
        expect(TextSchema.safeParse(42).success).toBe(false);
    });
});

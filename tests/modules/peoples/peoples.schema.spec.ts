import { PeoplesInsertSchema, PeoplesSchema } from '../../../src/modules/peoples/peoples.schema';



const VALID_PEOPLE_INSERT = {
    first_name: 'Alice',
    last_name: 'Martin',
    date_of_birth: '1990-05-12',
};



/**
 * Schema of a person sent by the client
 */
describe('Peoples insert schema tests', () => {
    it('Accepts a complete person', () => {
        expect(PeoplesInsertSchema.parse(VALID_PEOPLE_INSERT)).toEqual(VALID_PEOPLE_INSERT);
    });


    it('Only requires the first name', () => {
        expect(PeoplesInsertSchema.parse({ first_name: 'Alice' })).toEqual({
            first_name: 'Alice',
            last_name: null,
            date_of_birth: null,
        });
    });


    it('Trims the names, and stores an empty last name as null', () => {
        const people = PeoplesInsertSchema.parse({ ...VALID_PEOPLE_INSERT, first_name: '  Alice ', last_name: '  ' });

        expect(people.first_name).toBe('Alice');
        expect(people.last_name).toBeNull();
    });


    it('Ignores the user sent by the client', () => {
        const people = PeoplesInsertSchema.parse({ ...VALID_PEOPLE_INSERT, user_id: 1, user: { id: 1 } });

        expect(people).not.toHaveProperty('user_id');
        expect(people).not.toHaveProperty('user');
    });


    it('Refuses an invalid person', () => {
        const invalidPeoples = [
            { ...VALID_PEOPLE_INSERT, first_name: '' },
            { ...VALID_PEOPLE_INSERT, first_name: '   ' },
            { ...VALID_PEOPLE_INSERT, first_name: 'a'.repeat(256) },
            { ...VALID_PEOPLE_INSERT, last_name: 'a'.repeat(256) },
            { ...VALID_PEOPLE_INSERT, date_of_birth: '1990-02-30' },
            { ...VALID_PEOPLE_INSERT, date_of_birth: '1990-05-12T00:00:00.000Z' },
            { ...VALID_PEOPLE_INSERT, date_of_birth: '1899-12-31' },
            { ...VALID_PEOPLE_INSERT, date_of_birth: '3000-01-01' },
            { last_name: 'Martin' },
        ];

        for (const people of invalidPeoples) {
            expect(PeoplesInsertSchema.safeParse(people).success).toBe(false);
        }
    });
});



/**
 * Schema of a person read from the database
 */
describe('Peoples schema tests', () => {
    it('Accepts a row of the database, with its date of birth as a "YYYY-MM-DD" string', () => {
        const row = {
            id: 1,
            ...VALID_PEOPLE_INSERT,
            user_id: 42,
            created_at: new Date(),
            updated_at: new Date(),
        };

        expect(PeoplesSchema.parse(row)).toEqual(row);
    });
});

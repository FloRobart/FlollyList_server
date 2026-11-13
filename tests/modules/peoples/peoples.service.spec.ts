import * as PeoplesRepository from '../../../src/modules/peoples/peoples.repository';
import * as PeoplesService from '../../../src/modules/peoples/peoples.service';
import { People, PeopleInsert } from '../../../src/modules/peoples/peoples.types';



const USER_ID = 42;

const PEOPLE_INSERT: PeopleInsert = {
    first_name: 'Alice',
    last_name: 'Martin',
    date_of_birth: '1990-05-12',
};

const PEOPLE_ROW: People = {
    id: 1,
    ...PEOPLE_INSERT,
    user_id: USER_ID,
    created_at: new Date('2026-11-01T10:00:00.000Z'),
    updated_at: new Date('2026-11-01T10:00:00.000Z'),
};



/**
 * Peoples service tests
 */
describe('Peoples service tests', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });


    it('Creates a person while the user is under the limit', async () => {
        jest.spyOn(PeoplesRepository, 'countPeoples').mockResolvedValue(PeoplesService.MAX_PEOPLES_PER_USER - 1);
        const insertMock = jest.spyOn(PeoplesRepository, 'insertPeople').mockResolvedValue(PEOPLE_ROW);

        await expect(PeoplesService.insertPeople(USER_ID, PEOPLE_INSERT)).resolves.toEqual(PEOPLE_ROW);
        expect(insertMock).toHaveBeenCalledWith(USER_ID, PEOPLE_INSERT);
    });


    it('Refuses a new person with 403 once the user has reached the limit', async () => {
        jest.spyOn(PeoplesRepository, 'countPeoples').mockResolvedValue(PeoplesService.MAX_PEOPLES_PER_USER);
        const insertMock = jest.spyOn(PeoplesRepository, 'insertPeople');

        await expect(PeoplesService.insertPeople(USER_ID, PEOPLE_INSERT)).rejects.toMatchObject({ httpStatus: 403 });
        expect(insertMock).not.toHaveBeenCalled();
    });


    it('Answers 500 without the details when the database returns an unexpected row', async () => {
        jest.spyOn(PeoplesRepository, 'selectPeoples').mockResolvedValue([{ ...PEOPLE_ROW, id: 'not an id' } as unknown as People]);

        await expect(PeoplesService.selectPeoples(USER_ID)).rejects.toMatchObject({ httpStatus: 500, message: 'Failed to parse peoples' });
    });
});

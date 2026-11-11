import { Database } from '../../../src/core/models/Database.model';
import { AppError } from '../../../src/core/models/AppError.model';
import * as PeoplesRepository from '../../../src/modules/peoples/peoples.repository';
import { PeopleInsert } from '../../../src/modules/peoples/peoples.types';



const USER_ID = 42;
const PEOPLE_ID = 5;

const PEOPLE: PeopleInsert = {
    first_name: 'Alice',
    last_name: null,
    date_of_birth: '1990-05-12',
};



/**
 * Peoples repository tests: a user only reaches its own people.
 */
describe('Peoples repository tests', () => {
    let executeMock: jest.SpyInstance;


    beforeEach(() => {
        executeMock = jest.spyOn(Database, 'execute').mockResolvedValue([{ id: PEOPLE_ID, user_id: USER_ID }]);
    });


    afterEach(() => {
        jest.restoreAllMocks();
    });


    it('Selects only the people of the user', async () => {
        await PeoplesRepository.selectPeoples(USER_ID);

        expect(executeMock).toHaveBeenCalledWith({ text: expect.stringContaining('WHERE user_id = $1'), values: [USER_ID] });
    });


    it('Creates the person for the user given by the server', async () => {
        await PeoplesRepository.insertPeople(USER_ID, PEOPLE);

        expect(executeMock).toHaveBeenCalledWith({
            text: expect.stringContaining('INSERT INTO peoples (first_name, last_name, date_of_birth, user_id)'),
            values: ['Alice', null, '1990-05-12', USER_ID],
        });
    });


    it('Updates a person only if it belongs to the user', async () => {
        await PeoplesRepository.updatePeople(USER_ID, PEOPLE_ID, PEOPLE);

        const query = executeMock.mock.calls[0][0];
        expect(query.text).toContain('WHERE id = $4 AND user_id = $5');
        expect(query.values.slice(-2)).toEqual([PEOPLE_ID, USER_ID]);
    });


    it('Answers 404 when the user has no person with this ID', async () => {
        executeMock.mockResolvedValue([]);

        await expect(PeoplesRepository.updatePeople(USER_ID, PEOPLE_ID, PEOPLE)).rejects.toMatchObject({ httpStatus: 404 });
        await expect(PeoplesRepository.deletePeople(USER_ID, PEOPLE_ID)).rejects.toBeInstanceOf(AppError);
    });


    it('Deletes a person only if it belongs to the user', async () => {
        await PeoplesRepository.deletePeople(USER_ID, PEOPLE_ID);

        expect(executeMock).toHaveBeenCalledWith({ text: expect.stringContaining('WHERE id = $1 AND user_id = $2'), values: [PEOPLE_ID, USER_ID] });
    });


    it('Counts only the people of the user', async () => {
        executeMock.mockResolvedValue([{ count: 3 }]);

        await expect(PeoplesRepository.countPeoples(USER_ID)).resolves.toBe(3);
        expect(executeMock).toHaveBeenCalledWith({ text: expect.stringContaining('WHERE user_id = $1'), values: [USER_ID] });
    });
});

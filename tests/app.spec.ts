import axios from 'axios';
import { once } from 'node:events';
import { Server } from 'node:http';
import { AddressInfo } from 'node:net';
import app from '../src/app';
import { Database } from '../src/core/models/Database.model';



/* The authentication server is replaced by a mock */
jest.mock('axios');
const axiosGetMock = axios.get as jest.Mock;

/* Nothing needs to be printed: neither the expected errors nor the access logs */
jest.mock('../src/core/utils/logger');
jest.mock('morgan', () => Object.assign(
    () => (_req: unknown, _res: unknown, next: () => void) => next(),
    { token: jest.fn() },
));

const AUTHORIZATION_HEADER = 'Bearer header.payload.signature';

const USER_FROM_AUTHENTICATION_SERVER = {
    id: 42,
    email: 'user@hollylist.fr',
    pseudo: 'user',
    auth_methods_id: 1,
    is_connected: true,
    is_verified_email: true,
    last_logout_at: '2026-11-01T00:00:00.000Z',
    created_at: '2026-01-01T00:00:00.000Z',
};

const PEOPLE_ROW = {
    id: 1,
    first_name: 'Alice',
    last_name: null,
    date_of_birth: '1990-05-12',
    user_id: 42,
    created_at: new Date('2026-11-01T10:00:00.000Z'),
    updated_at: new Date('2026-11-01T10:00:00.000Z'),
};



/**
 * Tests of the whole API, through a real HTTP server
 */
describe('Application tests', () => {
    let server: Server;
    let baseUrl: string;
    let executeMock: jest.SpyInstance;


    beforeAll(async () => {
        server = app.listen(0, '127.0.0.1');
        await once(server, 'listening');
        baseUrl = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
    });


    afterAll(() => {
        server.close();
    });


    beforeEach(() => {
        axiosGetMock.mockResolvedValue({ status: 200, data: USER_FROM_AUTHENTICATION_SERVER });
        executeMock = jest.spyOn(Database, 'execute').mockResolvedValue([PEOPLE_ROW]);
    });


    afterEach(() => {
        jest.restoreAllMocks();
    });


    it('Answers the health check without authentication', async () => {
        const response = await fetch(`${baseUrl}/`);

        expect(response.status).toBe(200);
        expect(axiosGetMock).not.toHaveBeenCalled();
    });


    it('Refuses a request without token, without reading the database', async () => {
        const response = await fetch(`${baseUrl}/peoples`);

        expect(response.status).toBe(401);
        expect(executeMock).not.toHaveBeenCalled();
    });


    it('Answers the people of the user given by the authentication server, never the one of the body', async () => {
        const response = await fetch(`${baseUrl}/peoples`, {
            method: 'GET',
            headers: { Authorization: AUTHORIZATION_HEADER },
        });

        expect(response.status).toBe(200);
        expect(await response.json()).toEqual([{ ...PEOPLE_ROW, created_at: '2026-11-01T10:00:00.000Z', updated_at: '2026-11-01T10:00:00.000Z' }]);
        expect(executeMock).toHaveBeenCalledWith(expect.objectContaining({ values: [USER_FROM_AUTHENTICATION_SERVER.id] }));
    });


    it('Answers an empty array, not 204, when the user has no people', async () => {
        executeMock.mockResolvedValue([]);

        const response = await fetch(`${baseUrl}/peoples`, { headers: { Authorization: AUTHORIZATION_HEADER } });

        expect(response.status).toBe(200);
        expect(await response.json()).toEqual([]);
    });


    it('Creates a person for the user of the token, even if the body names another user', async () => {
        /* First query: the number of people of the user, under the limit */
        executeMock.mockResolvedValueOnce([{ count: 0 }]);

        const response = await sendJson('POST', '/peoples', { first_name: 'Alice', user_id: 1, user: { id: 1 } });

        expect(response.status).toBe(201);
        const insertQuery = executeMock.mock.calls[1][0];
        expect(insertQuery.text).toContain('INSERT INTO peoples');
        expect(insertQuery.values).toEqual(['Alice', null, null, USER_FROM_AUTHENTICATION_SERVER.id]);
    });


    it('Refuses an invalid body with 400, without writing in the database', async () => {
        const response = await sendJson('POST', '/gifts', { gift_name: '', people_id: 'abc' });

        expect(response.status).toBe(400);
        expect(executeMock).not.toHaveBeenCalled();
    });


    it('Refuses an invalid identifier in the URL with 400', async () => {
        const response = await sendJson('DELETE', '/gifts/1e3', {});

        expect(response.status).toBe(400);
        expect(executeMock).not.toHaveBeenCalled();
    });


    it('Answers 404 to an unknown URL', async () => {
        const response = await fetch(`${baseUrl}/unknown`, { headers: { Authorization: AUTHORIZATION_HEADER } });

        expect(response.status).toBe(404);
    });


    /**
     * Sends a JSON body with the token of the user.
     * @param method The HTTP method
     * @param path The path of the URL
     * @param body The body, encoded in JSON
     * @returns The response
     */
    async function sendJson(method: string, path: string, body: object): Promise<Response> {
        return await fetch(`${baseUrl}${path}`, {
            method,
            headers: { Authorization: AUTHORIZATION_HEADER, 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
    }
});

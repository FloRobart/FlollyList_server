/*========*/
/* SELECT */
/*========*/
/**
 * @swagger
 * components:
 *   schemas:
 *     Peoples:
 *       type: object
 *       required:
 *         - id
 *         - first_name
 *         - user_id
 *         - created_at
 *         - updated_at
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         first_name:
 *           type: string
 *           example: "John"
 *         last_name:
 *           oneOf:
 *             - type: string
 *               example: "Doe"
 *             - type: 'null'
 *         date_of_birth:
 *           oneOf:
 *             - type: string
 *               format: "YYYY-MM-DDTHH:mm:ss[.sss][Z]"
 *               example: "1990-01-01:00:00:00"
 *             - type: 'null'
 *         user_id:
 *           type: integer
 *           example: 1
 *         created_at:
 *           type: string
 *           format: "YYYY-MM-DDTHH:mm:ss[.sss][Z]"
 *           example: "2024-01-01T00:00:00.000Z"
 *         updated_at:
 *           type: string
 *           format: "YYYY-MM-DDTHH:mm:ss[.sss][Z]"
 *           example: "2024-01-01T00:00:00.000Z"
 */


/*========*/
/* INSERT */
/*========*/
/**
 * @swagger
 * components:
 *   schemas:
 *     PeoplesInsert:
 *       type: object
 *       required:
 *         - first_name
 *       properties:
 *         first_name:
 *           type: string
 *           example: "John"
 *         last_name:
 *           type: string
 *           example: "Doe"
 *         date_of_birth:
 *           type: string
 *           format: "YYYY-MM-DDTHH:mm:ss[.sss][Z]"
 *           example: "1990-01-01:00:00:00"
 */


/*========*/
/* UPDATE */
/*========*/
/**
 * @swagger
 * components:
 *   schemas:
 *     PeoplesUpdate:
 *       type: object
 *       required:
 *         - id
 *         - first_name
 *         - last_name
 *         - user_id
 *         - created_at
 *         - updated_at
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         first_name:
 *           type: string
 *           example: "John"
 *         last_name:
 *           type: string
 *           example: "Doe"
 *         date_of_birth:
 *           type: string
 *           format: "YYYY-MM-DDTHH:mm:ss[.sss][Z]"
 *           example: "1990-01-01:00:00:00"
 *         user_id:
 *           type: integer
 *           example: 1
 *         created_at:
 *           type: string
 *           format: "YYYY-MM-DDTHH:mm:ss[.sss][Z]"
 *           example: "2024-01-01T00:00:00.000Z"
 *         updated_at:
 *           type: string
 *           format: "YYYY-MM-DDTHH:mm:ss[.sss][Z]"
 *           example: "2024-01-01T00:00:00.000Z"
 */

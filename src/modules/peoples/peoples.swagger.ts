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
 *         - last_name
 *         - date_of_birth
 *         - user_id
 *         - created_at
 *         - updated_at
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         first_name:
 *           type: string
 *           example: "Alice"
 *         last_name:
 *           type: string
 *           nullable: true
 *           example: "Martin"
 *         date_of_birth:
 *           type: string
 *           format: date
 *           nullable: true
 *           example: "1990-05-12"
 *         user_id:
 *           type: integer
 *           example: 1
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: "2026-01-01T00:00:00.000Z"
 *         updated_at:
 *           type: string
 *           format: date-time
 *           example: "2026-01-01T00:00:00.000Z"
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
 *           minLength: 1
 *           maxLength: 255
 *           example: "Alice"
 *         last_name:
 *           type: string
 *           nullable: true
 *           maxLength: 255
 *           description: Empty or missing means no last name
 *           example: "Martin"
 *         date_of_birth:
 *           type: string
 *           format: date
 *           nullable: true
 *           description: Between 1900-01-01 and tomorrow
 *           example: "1990-05-12"
 */


/*========*/
/* UPDATE */
/*========*/
/**
 * @swagger
 * components:
 *   schemas:
 *     PeoplesUpdate:
 *       $ref: '#/components/schemas/PeoplesInsert'
 */

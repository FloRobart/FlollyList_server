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
 *         - people_name
 *         - person_id
 *         - user_id
 *         - created_at
 *         - updated_at
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         people_name:
 *           type: string
 *           example: "Chocolate Box"
 *         people_description:
 *           type: string
 *           example: "A box of assorted chocolates."
 *         people_year:
 *           type: integer
 *           example: 2025
 *         link:
 *           type: string
 *           example: "http://example.com/chocolate-box"
 *         person_id:
 *           type: integer
 *           example: 2
 *         user_id:
 *           type: integer
 *           example: 1
 *         created_at:
 *           type: string
 *           example: "2024-01-01T00:00:00.000Z"
 *         updated_at:
 *           type: string
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
 *         - people_name
 *         - person_id
 *         - user_id
 *       properties:
 *         people_name:
 *           type: string
 *           example: "Chocolate Box"
 *         people_description:
 *           type: string
 *           example: "A box of assorted chocolates."
 *         people_year:
 *           type: integer
 *           example: 2025
 *         link:
 *           type: string
 *           example: "http://example.com/chocolate-box"
 *         person_id:
 *           type: integer
 *           example: 2
 *         user_id:
 *           type: integer
 *           example: 1
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
 *         - people_name
 *         - person_id
 *         - user_id
 *         - created_at
 *         - updated_at
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         people_name:
 *           type: string
 *           example: "Chocolate Box"
 *         people_description:
 *           type: string
 *           example: "A box of assorted chocolates."
 *         people_year:
 *           type: integer
 *           example: 2025
 *         link:
 *           type: string
 *           example: "http://example.com/chocolate-box"
 *         person_id:
 *           type: integer
 *           example: 2
 *         user_id:
 *           type: integer
 *           example: 1
 *         created_at:
 *           type: string
 *           example: "2024-01-01T00:00:00.000Z"
 *         updated_at:
 *           type: string
 *           example: "2024-01-01T00:00:00.000Z"
 */

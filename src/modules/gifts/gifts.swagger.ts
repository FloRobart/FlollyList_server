/*========*/
/* SELECT */
/*========*/
/**
 * @swagger
 * components:
 *   schemas:
 *     Gifts:
 *       type: object
 *       required:
 *         - id
 *         - gift_name
 *         - gift_description
 *         - gift_year
 *         - price
 *         - link
 *         - people_id
 *         - user_id
 *         - created_at
 *         - updated_at
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         gift_name:
 *           type: string
 *           example: "Puzzle 1000 pièces"
 *         gift_description:
 *           type: string
 *           nullable: true
 *           example: "Un paysage de montagne"
 *         gift_year:
 *           type: integer
 *           nullable: true
 *           example: 2026
 *         price:
 *           type: number
 *           example: 24.99
 *         link:
 *           type: string
 *           nullable: true
 *           example: "https://example.com/puzzle"
 *         people_id:
 *           type: integer
 *           example: 1
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
 *     GiftsInsert:
 *       type: object
 *       required:
 *         - gift_name
 *         - people_id
 *       properties:
 *         gift_name:
 *           type: string
 *           minLength: 1
 *           maxLength: 255
 *           example: "Puzzle 1000 pièces"
 *         gift_description:
 *           type: string
 *           nullable: true
 *           maxLength: 2000
 *           description: Empty or missing means no description
 *           example: "Un paysage de montagne"
 *         gift_year:
 *           type: integer
 *           nullable: true
 *           minimum: 1900
 *           maximum: 2200
 *           example: 2026
 *         price:
 *           type: number
 *           minimum: 0
 *           maximum: 9999999999.99
 *           description: 0 when missing
 *           example: 24.99
 *         link:
 *           type: string
 *           nullable: true
 *           maxLength: 2048
 *           description: Empty or missing means no link
 *           example: "https://example.com/puzzle"
 *         people_id:
 *           type: integer
 *           description: One of the people of the user
 *           example: 1
 */


/*========*/
/* UPDATE */
/*========*/
/**
 * @swagger
 * components:
 *   schemas:
 *     GiftsUpdate:
 *       $ref: '#/components/schemas/GiftsInsert'
 */

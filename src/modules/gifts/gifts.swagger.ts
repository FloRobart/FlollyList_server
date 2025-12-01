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
 *         - person_id
 *         - user_id
 *         - created_at
 *         - updated_at
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         gift_name:
 *           type: string
 *           example: "Chocolate Box"
 *         gift_description:
 *           type: string
 *           example: "A box of assorted chocolates."
 *         gift_year:
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
 *     GiftsInsert:
 *       type: object
 *       required:
 *         - gift_name
 *         - person_id
 *         - user_id
 *       properties:
 *         gift_name:
 *           type: string
 *           example: "Chocolate Box"
 *         gift_description:
 *           type: string
 *           example: "A box of assorted chocolates."
 *         gift_year:
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
 *     GiftsUpdate:
 *       type: object
 *       required:
 *         - id
 *         - gift_name
 *         - person_id
 *         - user_id
 *         - created_at
 *         - updated_at
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         gift_name:
 *           type: string
 *           example: "Chocolate Box"
 *         gift_description:
 *           type: string
 *           example: "A box of assorted chocolates."
 *         gift_year:
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

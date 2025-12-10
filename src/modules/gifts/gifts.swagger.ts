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
 *           example: "Chocolate Box"
 *         gift_description:
 *           oneOf:
 *             - type: string
 *               example: "A box of assorted chocolates."
 *               description: "A brief description of the gift."
 *             - type: 'null'
 *         gift_year:
 *           oneOf:
 *             - type: integer
 *               example: 2025
 *               description: "The year the gift is intended for."
 *             - type: 'null'
 *         link:
 *           oneOf:
 *             - type: string
 *               example: "http://example.com/chocolate-box"
 *               description: "A URL to the gift."
 *             - type: 'null'
 *         people_id:
 *           type: integer
 *           example: 2
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
 *     GiftsInsert:
 *       type: object
 *       required:
 *         - gift_name
 *         - people_id
 *       properties:
 *         gift_name:
 *           type: string
 *           example: "Chocolate Box"
 *         gift_description:
 *           oneOf:
 *             - type: string
 *               example: "A box of assorted chocolates."
 *               description: "A brief description of the gift."
 *             - type: 'null'
 *         gift_year:
 *           oneOf:
 *             - type: integer
 *               example: 2025
 *               description: "The year the gift is intended for."
 *             - type: 'null'
 *         link:
 *           oneOf:
 *             - type: string
 *               example: "http://example.com/chocolate-box"
 *               description: "A URL to the gift."
 *             - type: 'null'
 *         people_id:
 *           type: integer
 *           example: 2
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
 *         - gift_description
 *         - gift_year
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
 *           example: "Chocolate Box"
 *         gift_description:
 *           oneOf:
 *             - type: string
 *               example: "A box of assorted chocolates."
 *               description: "A brief description of the gift."
 *             - type: 'null'
 *         gift_year:
 *           oneOf:
 *             - type: integer
 *               example: 2025
 *               description: "The year the gift is intended for."
 *             - type: 'null'
 *         link:
 *           oneOf:
 *             - type: string
 *               example: "http://example.com/chocolate-box"
 *               description: "A URL to the gift."
 *             - type: 'null'
 *         people_id:
 *           type: integer
 *           example: 2
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

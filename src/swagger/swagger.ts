/**
 * @swagger
 * components:
 *   schemas:
 *     error400:
 *       type: string
 *       example: "Invalid request data"
 *     error401:
 *       type: string
 *       example: "Invalid Authorization header"
 *     error403:
 *       type: string
 *       example: "A user cannot have more than 10000 gifts"
 *     error404:
 *       type: string
 *       example: "No gift deleted"
 *     error429:
 *       type: object
 *       required:
 *         - error
 *       properties:
 *         error:
 *           type: string
 *           example: "Too many requests, please try again later."
 *     error500:
 *       type: string
 *       example: "Internal Server Error"
 */

/* Security Schemes */
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

import { Router } from "express";
import { bodyValidator } from "../../core/middlewares/validators/body_validator.middleware";
import { paramsQueryValidator } from "../../core/middlewares/validators/params_query_validator.middleware";
import * as GiftsController from "./gifts.controller";
import { IdSchema, GiftsInsertSchema, GiftsUpdateSchema } from "./gifts.schema";



const router = Router();



/*========*/
/* SELECT */
/*========*/
/**
 * @swagger
 * /gifts:
 *   get:
 *     tags:
 *       - Gifts
 *     summary: Retrieve a list of gifts of the authenticated user
 *     description: Retrieve a list of gifts associated with the authenticated user.
 *     parameters:
 *       - in: headers
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: "Bearer <token>"
 *     responses:
 *       200:
 *         description: A list of gifts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Gifts'
 *       204:
 *         description: No content. No gifts found.
 *       401:
 *         description: Unauthorized access.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/error401'
 *       500:
 *         description: Internal server error. Please create an issue on Github
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/error500'
 */
router.get('/', GiftsController.selectGifts);


/*========*/
/* INSERT */
/*========*/
/**
 * @swagger
 * /gifts:
 *   post:
 *     tags:
 *       - Gifts
 *     summary: Create a new gift for the authenticated user
 *     description: Create a new gift associated with the authenticated user.
 *     parameters:
 *       - in: headers
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: "Bearer <token>"
 *       - in: body
 *         name: gift
 *         required: true
 *         description: gift object that needs to be added
 *         schema:
 *           $ref: '#/components/schemas/GiftsInsert'
 *     responses:
 *       201:
 *         description: Created gift
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Gifts'
 *       400:
 *         description: Bad request. Please check the input data.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/error400'
 *       401:
 *         description: Unauthorized access.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/error401'
 *       500:
 *         description: Internal server error. Please create an issue on Github
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/error500'
 */
router.post('/', bodyValidator(GiftsInsertSchema), GiftsController.insertGifts);


/*========*/
/* UPDATE */
/*========*/
/**
 * @swagger
 * /gifts:
 *   put:
 *     tags:
 *       - Gifts
 *     summary: Update an existing gift for the authenticated user
 *     description: Update an existing gift associated with the authenticated user.
 *     parameters:
 *       - in: headers
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: "Bearer <token>"
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: body
 *         name: gift
 *         required: true
 *         description: gift object that needs to be updated
 *         schema:
 *           $ref: '#/components/schemas/GiftsUpdate'
 *     responses:
 *       200:
 *         description: Updated gift
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Gifts'
 *       400:
 *         description: Bad request. Please check the input data.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/error400'
 *       401:
 *         description: Unauthorized access.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/error401'
 *       500:
 *         description: Internal server error. Please create an issue on Github
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/error500'
 */
router.put('/:id', paramsQueryValidator(IdSchema), bodyValidator(GiftsUpdateSchema), GiftsController.updateGifts);


/*========*/
/* DELETE */
/*========*/
/**
 * @swagger
 * /gifts:
 *   delete:
 *     tags:
 *       - Gifts
 *     summary: Delete an existing gift for the authenticated user
 *     description: Delete an existing gift associated with the authenticated user.
 *     parameters:
 *       - in: headers
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: "Bearer <token>"
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Deleted gift
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Gifts'
 *       400:
 *         description: Bad request. Please check the input data.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/error400'
 *       401:
 *         description: Unauthorized access.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/error401'
 *       500:
 *         description: Internal server error. Please create an issue on Github
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/error500'
 */
router.delete('/:id', paramsQueryValidator(IdSchema), GiftsController.deleteGifts);



export default router;
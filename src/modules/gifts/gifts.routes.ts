import { Router } from "express";
import * as GiftsController from "./gifts.controller";
import { bodyValidator } from "../../core/middlewares/validators/body_validator.middleware";
import { paramsQueryValidator } from "../../core/middlewares/validators/params_query_validator.middleware";
import { IdParamsSchema } from "../../core/schemas/common.schema";
import { GiftsInsertSchema, GiftsUpdateSchema } from "./gifts.schema";



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
 *     summary: Retrieve the gifts of the authenticated user
 *     description: Retrieve every gift of the authenticated user, for all of its people, in the order of their creation.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The gifts of the user, an empty array if there are none
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Gifts'
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
 *     summary: Create a gift for a person of the authenticated user
 *     description: Create a gift for one of the people of the authenticated user. Empty texts are stored as null.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GiftsInsert'
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
 *       403:
 *         description: The user has reached the maximum number of gifts.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/error403'
 *       404:
 *         description: The person of the gift is not one of the people of the user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/error404'
 *       500:
 *         description: Internal server error. Please create an issue on Github
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/error500'
 */
router.post('/', bodyValidator(GiftsInsertSchema), GiftsController.insertGift);


/*========*/
/* UPDATE */
/*========*/
/**
 * @swagger
 * /gifts/{id}:
 *   put:
 *     tags:
 *       - Gifts
 *     summary: Update a gift of the authenticated user
 *     description: Replace every field of a gift of the authenticated user. The gift can move to another of its people.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GiftsUpdate'
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
 *       404:
 *         description: The user has no gift with this ID, or the person of the gift is not one of its people.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/error404'
 *       500:
 *         description: Internal server error. Please create an issue on Github
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/error500'
 */
router.put('/:id', paramsQueryValidator(IdParamsSchema), bodyValidator(GiftsUpdateSchema), GiftsController.updateGift);


/*========*/
/* DELETE */
/*========*/
/**
 * @swagger
 * /gifts/{id}:
 *   delete:
 *     tags:
 *       - Gifts
 *     summary: Delete a gift of the authenticated user
 *     description: Delete a gift of the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     parameters:
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
 *       404:
 *         description: The user has no gift with this ID.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/error404'
 *       500:
 *         description: Internal server error. Please create an issue on Github
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/error500'
 */
router.delete('/:id', paramsQueryValidator(IdParamsSchema), GiftsController.deleteGift);



export default router;

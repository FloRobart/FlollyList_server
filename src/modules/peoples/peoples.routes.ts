import { Router } from "express";
import * as PeoplesController from "./peoples.controller";
import { bodyValidator } from "../../core/middlewares/validators/body_validator.middleware";
import { paramsQueryValidator } from "../../core/middlewares/validators/params_query_validator.middleware";
import { IdParamsSchema } from "../../core/schemas/common.schema";
import { PeoplesInsertSchema, PeoplesUpdateSchema } from "./peoples.schema";



const router = Router();



/*========*/
/* SELECT */
/*========*/
/**
 * @swagger
 * /peoples:
 *   get:
 *     tags:
 *       - Peoples
 *     summary: Retrieve the people of the authenticated user
 *     description: Retrieve every person of the authenticated user, in the order of their creation.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The people of the user, an empty array if there are none
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Peoples'
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
router.get('/', PeoplesController.selectPeoples);


/*========*/
/* INSERT */
/*========*/
/**
 * @swagger
 * /peoples:
 *   post:
 *     tags:
 *       - Peoples
 *     summary: Create a person for the authenticated user
 *     description: Create a person for the authenticated user. An empty last name is stored as null.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PeoplesInsert'
 *     responses:
 *       201:
 *         description: Created person
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Peoples'
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
 *         description: The user has reached the maximum number of people.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/error403'
 *       500:
 *         description: Internal server error. Please create an issue on Github
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/error500'
 */
router.post('/', bodyValidator(PeoplesInsertSchema), PeoplesController.insertPeople);


/*========*/
/* UPDATE */
/*========*/
/**
 * @swagger
 * /peoples/{id}:
 *   put:
 *     tags:
 *       - Peoples
 *     summary: Update a person of the authenticated user
 *     description: Replace every field of a person of the authenticated user.
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
 *             $ref: '#/components/schemas/PeoplesUpdate'
 *     responses:
 *       200:
 *         description: Updated person
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Peoples'
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
 *         description: The user has no person with this ID.
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
router.put('/:id', paramsQueryValidator(IdParamsSchema), bodyValidator(PeoplesUpdateSchema), PeoplesController.updatePeople);


/*========*/
/* DELETE */
/*========*/
/**
 * @swagger
 * /peoples/{id}:
 *   delete:
 *     tags:
 *       - Peoples
 *     summary: Delete a person of the authenticated user
 *     description: Delete a person of the authenticated user, with all its gifts.
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
 *         description: Deleted person
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Peoples'
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
 *         description: The user has no person with this ID.
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
router.delete('/:id', paramsQueryValidator(IdParamsSchema), PeoplesController.deletePeople);



export default router;

import { Router } from "express";
import { bodyValidator } from "../../core/middlewares/validators/body_validator.middleware";
import { paramsQueryValidator } from "../../core/middlewares/validators/params_query_validator.middleware";
import * as PeoplesController from "./peoples.controller";
import { IdSchema, PeoplesInsertSchema, PeoplesUpdateSchema } from "./peoples.schema";



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
 *     summary: Retrieve a list of peoples of the authenticated user
 *     description: Retrieve a list of peoples associated with the authenticated user.
 *     parameters:
 *       - in: headers
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: "Bearer <token>"
 *     responses:
 *       200:
 *         description: A list of peoples
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Peoples'
 *       204:
 *         description: No content. No peoples found.
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
 *     summary: Create a new people for the authenticated user
 *     description: Create a new people associated with the authenticated user.
 *     parameters:
 *       - in: headers
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: "Bearer <token>"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PeoplesInsert'
 *     responses:
 *       201:
 *         description: Created people
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
 *       500:
 *         description: Internal server error. Please create an issue on Github
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/error500'
 */
router.post('/', bodyValidator(PeoplesInsertSchema), PeoplesController.insertPeoples);


/*========*/
/* UPDATE */
/*========*/
/**
 * @swagger
 * /peoples/{id}:
 *   put:
 *     tags:
 *       - Peoples
 *     summary: Update an existing people for the authenticated user
 *     description: Update an existing people associated with the authenticated user.
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PeoplesUpdate'
 *     responses:
 *       200:
 *         description: Updated people
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
 *       500:
 *         description: Internal server error. Please create an issue on Github
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/error500'
 */
router.put('/:id', paramsQueryValidator(IdSchema), bodyValidator(PeoplesUpdateSchema), PeoplesController.updatePeoples);


/*========*/
/* DELETE */
/*========*/
/**
 * @swagger
 * /peoples/{id}:
 *   delete:
 *     tags:
 *       - Peoples
 *     summary: Delete an existing people for the authenticated user
 *     description: Delete an existing people associated with the authenticated user.
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
 *         description: Deleted people
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
 *       500:
 *         description: Internal server error. Please create an issue on Github
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/error500'
 */
router.delete('/:id', paramsQueryValidator(IdSchema), PeoplesController.deletePeoples);



export default router;
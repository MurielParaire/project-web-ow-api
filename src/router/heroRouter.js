import express from 'express'
import { getAllHeroesController, modifyHeroByIdController, deleteHeroByIdController, getHeroesByRoleController, getHeroByIdController, getHeroByNameController, getEventsOfHeroByNameController, createHeroController } from '../controller/characterController.js'
export const heroRouter = express.Router({mergeParams: true})

//all routes to get all the information about the heroes

/**
 * @swagger
 * tags:
 *   name: Heroes
 *   description: The heroes managing part of the API
 */

/**
 * @swagger
 * /heroes:
 *   get:
 *     summary: Lists all the heroes
 *     tags: [Heroes]
 *     parameters:
 *        - name: offset
 *          in: query
 *          description: offset of the results
 *          required: false
 *          schema:
 *            type: integer
 *            format: int64
 *        - name: limit
 *          in: query
 *          description: Limit of heroes returned
 *          required: false
 *          schema:
 *            type: integer
 *            format: int64
 *     responses:
 *       200:
 *         description: The list of all the heroes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/character'
 */
heroRouter.get('/', getAllHeroesController);

/**
 * @swagger
 * /heroes/{id}:
 *   get:
 *     summary: Get one hero by id
 *     tags: [Heroes]
 *     parameters:
 *        - name: id
 *          in: path
 *          description: Hero id
 *          required: true
 *          schema:
 *            type: integer
 *            format: int64
 *     responses:
 *       200:
 *         description: Get one hero by id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/character'
 */
heroRouter.get('/:id', getHeroByIdController);

/**
 * @swagger
 * /heroes/name/{name}:
 *   get:
 *     summary: Get one hero by name
 *     tags: [Heroes]
 *     parameters:
 *        - name: name
 *          in: path
 *          description: Hero name
 *          required: true
 *          schema:
 *            type: string
 *     responses:
 *       200:
 *         description: Get one hero by name
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/character'
 */
heroRouter.get('/name/:name', getHeroByNameController);

/**
 * @swagger
 * /heroes/event/{name}:
 *   get:
 *     summary: Get all the events related to one hero by the hero name
 *     tags: [Heroes]
 *     parameters:
 *        - name: name
 *          in: path
 *          description: Hero name
 *          required: true
 *          schema:
 *            type: string
 *     responses:
 *       200:
 *         description:  Get all the events related to one hero by the hero name
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/event'
 */
heroRouter.get('/event/:name', getEventsOfHeroByNameController);

/**
 * @swagger
 * /heroes/role/{role}:
 *   get:
 *     summary: Get all the heroes of a specific role
 *     tags: [Heroes]
 *     parameters:
 *        - name: role
 *          in: path
 *          description: Hero role
 *          required: true
 *          schema:
 *            type: string
 *     responses:
 *       200:
 *         description:  Get all the heroes of the specified role
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/character'
 */
heroRouter.get('/role/:role', getHeroesByRoleController);

/**
 * @swagger
 * /heroes/{id}:
 *   put:
 *     summary: Modify a hero by Id
 *     tags: [Heroes]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Hero id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *       - name: auth
 *         in: header
 *         description: User authorization
 *         required: true
 *         schema:
 *            type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            name: user
 *            description: The user to create.
 *            schema:
 *              $ref: '#/components/schemas/character'
 *     responses:
 *       200:
 *         description: Modify a hero by Id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/character'
 *       401: 
 *         description: You are not allowed to see this information?
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/user'
 */
heroRouter.put('/:id', modifyHeroByIdController);

/**
 * @swagger
 * /heroes:
 *   post:
 *     summary: Create a new hero
 *     tags: [Heroes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           description: The hero to create.
 *           schema:
 *             $ref: '#/components/schemas/characterPost'
 *     parameters:
 *      - name: auth
 *        in: header
 *        description: User authorization
 *        required: true
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: create a new hero
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: Integer
 *                 format: int64
 *       401: 
 *         description: You are not allowed to see this information?
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/user'
 */
heroRouter.post('', createHeroController);

/**
 * @swagger
 * /heroes/{id}:
 *   delete:
 *     summary: Delete a hero by its id
 *     tags: [Heroes]
 *     parameters:
 *        - name: id
 *          in: path
 *          description: Hero id
 *          required: true
 *          schema:
 *            type: integer
 *            format: int64
 *        - name: auth
 *          in: header
 *          description: User authorization
 *          required: true
 *          schema:
 *            type: string
 *     responses:
 *       200:
 *         description: Delete a hero by its id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: Integer
 *                 format: int64
 *       401: 
 *         description: You are not allowed to see this information?
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/user'
 */
heroRouter.delete('/:id', deleteHeroByIdController);


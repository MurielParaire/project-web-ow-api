import express from 'express'
import { getAllEventsController, getEventsForHeroController, modifyEventByIdController, deleteEventByIdController, getEventByIdController, getEventByTypeController, createEventController} from '../controller/eventController.js'

export const eventRouter = express.Router({mergeParams: true})

//all routes concerning the events

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: The event managing part of the API
 */


/**
 * @swagger
 * /events:
 *   get:
 *     summary: Lists all the events
 *     tags: [Events]
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
 *          description: Limit of events returned
 *          required: false
 *          schema:
 *            type: integer
 *            format: int64
 *     responses:
 *       200:
 *         description: The list of all the events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/event'
 */
eventRouter.get('', getAllEventsController);

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Get one event by its id
 *     tags: [Events]
 *     parameters:
 *        - name: id
 *          in: path
 *          description: Event id
 *          required: true
 *          schema:
 *            type: integer
 *            format: int64
 *     responses:
 *       200:
 *         description: Get one event by id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/event'
 */
eventRouter.get('/:id', getEventByIdController);

/**
 * @swagger
 * /events/type/{type}:
 *   get:
 *     summary: Get all the events of a specific type
 *     tags: [Events]
 *     parameters:
 *        - name: type
 *          in: path
 *          description: event type
 *          required: true
 *          schema:
 *            type: string
 *     responses:
 *       200:
 *         description:  Get all the events of the specified type
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/event'
 */
eventRouter.get('/type/:type', getEventByTypeController);

/**
 * @swagger
 * /events/hero/{id}:
 *   get:
 *     summary: Get all the events of a specific hero
 *     tags: [Events]
 *     parameters: 
 *        - in: path
 *          name: id
 *          description: hero id
 *          required: true
 *          type: String
 *     responses:
 *       200:
 *         description:  Get all the events of the specified type
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/event'
 */
eventRouter.get('/hero/:id', getEventsForHeroController);

/**
 * @swagger
 * /events/{id}:
 *   put:
 *     summary: Modify an event by its id
 *     tags: [Events]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: event id
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
 *           description: The user to create.
 *           schema:
 *             $ref: '#/components/schemas/event'
 *     responses:
 *       200:
 *         description: Modify an event by its id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/event'
 *       401: 
 *         description: You are not allowed to see this information
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/user'
 */
eventRouter.put('/:id', modifyEventByIdController);

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json: 
 *            description: The event to create.
 *            schema:
 *               $ref: '#/components/schemas/eventPost'
 *     parameters:
 *      - name: auth
 *        in: header
 *        description: User authorization
 *        required: true
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: create a new event
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: Integer
 *       401: 
 *         description: You are not allowed to see this information
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
eventRouter.post('/', createEventController);

/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     summary: Delete an event by its id
 *     tags: [Events]
 *     parameters:
 *        - name: id
 *          in: path
 *          description: event id
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
 *         description: Delete an event by its id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: Integer
 *                 format: int64
 *       401: 
 *         description: You are not allowed to see this information
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/user'
 */
eventRouter.delete('/:id', deleteEventByIdController);
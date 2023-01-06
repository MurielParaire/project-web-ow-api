import express from 'express'
import { postVerifyUserController, getUserHistoryController, deleteRoleFromUserByUserIdController, modifyUserByIdController, deleteUserByIdController, getAllUsersController, getUserInfoController, postUserHistoryController, createUserController, addRoleToUserByUserIdController } from '../controller/userController.js'

export const userRouter = express.Router({mergeParams: true})

//all user interactions

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The user managing part of the API
 */



/**
 * @swagger
 * /users/info:
 *   get:
 *     summary: Gets the information of one user
 *     tags: [Users]
 *     parameters:
 *       - name: auth
 *         in: header
 *         description: User authorization
 *         required: true
 *         schema:
 *            type: string
 *     responses:
 *       200:
 *         description: the information of one user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/user'
 *       401: 
 *         description: You are not allowed to see this information?
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
userRouter.get('/info', getUserInfoController);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lists all the users
 *     tags: [Users]
 *     parameters:
 *       - name: auth
 *         in: header
 *         description: User authorization
 *         required: true
 *         schema:
 *            type: string
 *       - name: offset
 *         in: query
 *         description: offset of the results
 *         required: false
 *         schema:
 *            type: integer
 *            format: int64
 *       - name: limit
 *         in: query
 *         description: Limit of users returned
 *         required: false
 *         schema:
 *            type: integer
 *            format: int64
 *     responses:
 *       200:
 *         description: The list of all the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/user'
 *       401: 
 *         description: You are not allowed to see this information
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
userRouter.get('', getAllUsersController);

/**
 * @swagger
 * /users/history:
 *   get:
 *     summary: Lists the users history
 *     tags: [Users]
 *     parameters:
 *       - name: auth
 *         in: header
 *         description: User authorization
 *         required: true
 *         schema:
 *            type: string
 *       - name: offset
 *         in: query
 *         description: offset of the results
 *         required: false
 *         schema:
 *            type: integer
 *            format: int64
 *       - name: limit
 *         in: query
 *         description: Limit of histories returned
 *         required: false
 *         schema:
 *            type: integer
 *            format: int64
 *     responses:
 *       200:
 *         description: The list of all the last games played by the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/history'
 *       401: 
 *         description: You are not allowed to see this information
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
userRouter.get('/history', getUserHistoryController);

/**
 * @swagger
 * /users/verify:
 *   post:
 *     summary: Verifies the user by using its username and password and returns a jwt
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *            type: object
 *            required:
 *              - username
 *              - password
 *            properties:
 *              password:
 *                type: string
 *                description: The password of the user.
 *              username:
 *                type: string
 *                description: The username of the user.
 *     responses:
 *       200:
 *         description: The list of all the last games played by the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
userRouter.post('/verify', postVerifyUserController);

/**
 * @swagger
 * /users/history:
 *   post:
 *     summary: Insert a new user history
 *     tags: [Users]
 *     parameters:
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
 *           schema:
 *             $ref: '#/components/schemas/history'
 *     responses:
 *       200:
 *         description: The list of all the last games played by the user.
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
 *               items:
 *                 type: Integer
 *                 format: int64
 */
userRouter.post('/history', postUserHistoryController);

/**
 * @swagger
 * /users/create:
 *   post:
 *     summary: create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *              description: The user to create
 *              schema:
 *                  $ref: '#/components/schemas/userPost'
 *     responses:
 *       200:
 *         description: status of the request.
 *         content:
 *           application/json:
 *             schema:
 *               type: Integer
 *       401: 
 *         description: You are not allowed to see this information
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 type: Integer
 *                 format: int64
 */
userRouter.post('/create', createUserController);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by its id
 *     tags: [Users]
 *     parameters:
 *        - name: id
 *          in: path
 *          description: user id
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
 *         description: Delete a user by its id
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
userRouter.delete('/:id', deleteUserByIdController);

/**
 * @swagger
 * /users/{id}/roles:
 *   delete:
 *     summary: Delete a role from a user by its id
 *     tags: [Users]
 *     parameters:
 *        - name: auth
 *          in: header
 *          description: User authorization
 *          required: true
 *          schema:
 *            type: string
 *        - name: id
 *          in: path
 *          description: user id
 *          required: true
 *          schema:
 *            type: integer
 *            format: int64
 *        - name: role
 *          in: query
 *          description: User role to remove
 *          required: true
 *          schema:
 *            type: string
 *     responses:
 *       200:
 *         description: Delete a role from a user by its id
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
 *                 type: string
 */
userRouter.delete('/:id/roles', deleteRoleFromUserByUserIdController);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: modify a user
 *     tags: [Users]
 *     parameters:
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
 *              description: The user to create
 *              schema:
 *                  $ref: '#/components/schemas/user'
 *     responses:
 *       200:
 *         description: The list of all the last games played by the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *       401: 
 *         description: You are not allowed to see this information
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 type: Integer
 *                 format: int64
 */
userRouter.put('/:id', modifyUserByIdController);

/**
 * @swagger
 * /users/{id}/roles:
 *   put:
 *     summary: add a new role to a user
 *     tags: [Users]
 *     parameters:
 *       - name: auth
 *         in: header
 *         description: User authorization
 *         required: true
 *         schema:
 *            type: string
 *       - name: id
 *         in: path
 *         description: user id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *       - name: role
 *         in: query
 *         description: User role to add
 *         required: true
 *         schema:
 *            type: string
 *     responses:
 *       200:
 *         description: The list of all the last games played by the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *       401: 
 *         description: You are not allowed to see this information
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 type: Integer
 *                 format: int64
 */
userRouter.put('/:id/roles', addRoleToUserByUserIdController);
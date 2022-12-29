import express from 'express'
import { getAllHeroesController, deleteHeroByIdController, getHeroesByTypeController, getHeroByIdController, getHeroByNameController, getEventsOfHeroByNameController, createHeroController } from '../controller/characterController.js'
import { getAllEventsController, modifyEventByIdController, deleteEventByIdController, getEventByIdController, getEventByTypeController, createEventController} from '../controller/eventController.js'
import { postVerifyUserController, deleteRoleFromUserByUserIdController, modifyUserByIdController, deleteUserByIdController, getAllUsersController, getUserInfoController, postUserHistoryController, createUserController, addRoleToUserByUserIdController } from '../controller/userController.js'

export const router = express.Router()

//all routes to get all the information about the heroes
router.get('/heroes', getAllHeroesController);
router.get('/heroes/:id', getHeroByIdController);
router.get('/heroes/name/:name', getHeroByNameController);
router.get('/heroes/event/:name', getEventsOfHeroByNameController);
router.get('/heroes/type/:type', getHeroesByTypeController);
router.post('/heroes', createHeroController);
router.delete('/heroes/:id', deleteHeroByIdController);



//all routes concerning the events
router.get('/events', getAllEventsController);
router.get('/events/:id', getEventByIdController);
router.get('/events/type/:type', getEventByTypeController)
router.post('/events/', createEventController);
router.delete('/events/:id', deleteEventByIdController);
router.put('/events/:id', modifyEventByIdController);

//all user interactions
router.get('/users/info', getUserInfoController);
router.get('/users', getAllUsersController);
router.post('/users/verify', postVerifyUserController);
router.post('/users/history', postUserHistoryController);
router.post('/users/create', createUserController);
router.delete('/users/:id', deleteUserByIdController);
router.delete('/users/:id/roles', deleteRoleFromUserByUserIdController);
router.put('/users/:id', modifyUserByIdController);
router.put('/users/:id/roles', addRoleToUserByUserIdController);

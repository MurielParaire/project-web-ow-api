import express from 'express'
import { getAllHeroesController, deleteHeroByIdController, getHeroesByTypeController, getHeroByIdController, getHeroByNameController, getEventsOfHeroByNameController, createHeroController } from '../controller/characterController.js'
import { getAllEventsController, deleteEventByIdController, getEventByIdController, getEventByTypeController, createEventController} from '../controller/eventController.js'
import { postVerifyUserController, deleteUserByIdController, getAllUsersController, getUserInfoController, postUserHistoryController, createUserController } from '../controller/userController.js'

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

//all user interactions
router.get('/users/info', getUserInfoController);
router.get('/users', getAllUsersController);
router.post('/users/verify', postVerifyUserController);
router.post('/users/history/', postUserHistoryController);
router.post('/users/create', createUserController);
router.delete('/users/:id', deleteUserByIdController);

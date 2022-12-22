import express from 'express'
import { getAllHeroesController, getHeroByIdController, getHeroByNameController, getEventsOfHeroByNameController } from '../controller/characterController.js'
import { getAllEventsController, getEventByIdController, getEventByTypeController} from '../controller/eventController.js'
import { postVerifyUserController, getUserByTokenController, postUserHistoryController, createUserController } from '../controller/userController.js'

export const router = express.Router()

//all routes to get all the information about the heroes
router.get('/heroes', getAllHeroesController);
router.get('/heroes/:id', getHeroByIdController);
router.get('/heroes/name/:name', getHeroByNameController);
router.get('/heroes/event/:name', getEventsOfHeroByNameController);


//all routes concerning the events
router.get('/events', getAllEventsController);
router.get('/events/:id', getEventByIdController);
router.get('/events/type/:type', getEventByTypeController)

//all user interactions
router.post('/users/verify', postVerifyUserController);
router.get('/users/token', getUserByTokenController);
router.post('/users/history/new', postUserHistoryController);
router.post('/users/create', createUserController);
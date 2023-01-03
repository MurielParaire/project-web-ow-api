import express from 'express'

import { heroRouter } from './heroRouter.js'
import { eventRouter } from './eventRouter.js'
import { userRouter } from './userRouter.js'

export const router = express.Router()

//all routes to get all the information about the heroes
router.use('/heroes', heroRouter);

//all routes concerning the events
router.use('/events', eventRouter);

//all user interactions
router.use('/users', userRouter);

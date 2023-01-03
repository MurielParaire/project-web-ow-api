import {getAllEventsService, getEventsForHeroService, modifyEventByIdService, deleteEventByIdService, getSomeEventsService, getEventByIdService, getEventByTypeService, createEventService} from '../services/eventService.js'
import { getJWT } from './token.js';


export const getAllEventsController = async (req, res) => {
    try {
        let results = 0;
        if ('limit' in req.query && 'offset' in req.query) {
            results = await getSomeEventsService(req.query.limit, req.query.offset);
        }
        else {
            results = await getAllEventsService();
        }
        res.status(200).json(results);
    }
    catch (err) {
        res.status(500);
        console.log(err);
    }
}

export const getEventByIdController = async (req, res) => {
    try {
        const id = req.params.id;
        let results = await getEventByIdService(id);
        res.status(200).json(results);
    }
    catch (err) {
        res.status(500);
        console.log(err);
    }
}

export const getEventByTypeController = async (req, res) => {
    try {
        const type = req.params.type;
        let results = await getEventByTypeService(type);
        res.status(200).json(results);
    }
    catch (err) {
        res.status(500);
        console.log(err);
    }
}

export const createEventController = async (req, res) => {
    try {
        let jwt = req.header('auth');
        jwt = getJWT(jwt)
        if (jwt.status === 401) {
            res.status(401).json(jwt)
            return 0;
        }
        const event = req.body;
        let results = await createEventService(jwt, event);
        res.status(200).json(results);
    }
    catch (err) {
        res.status(500);
        console.log(err);
    }
}


export const deleteEventByIdController = async (req, res) => {
    try {
        const id = req.params.id;
        let jwt = req.header('auth');
        jwt = getJWT(jwt)
        if (jwt.status === 401) {
            res.status(401).json(jwt)
            return 0;
        }
        let results = await deleteEventByIdService(jwt, id);
        res.status(200).json(results);
    }
    catch (err) {
        res.status(500);
        console.log(err);
    }
}


export const modifyEventByIdController = async (req, res) => {
    try {
        const id = req.params.id;
        let jwt = req.header('auth');
        jwt = getJWT(jwt)
        if (jwt.status === 401) {
            res.status(401).json(jwt)
            return 0;
        }
        let event = req.body;
        if (event.event_id.toString() !== id.toString()) {
            return {msg: 'There was an error. Please reload your page and retry this operation.'};
        }
        let results = await modifyEventByIdService(jwt, event);
        res.status(200).json(results);
    }
    catch (err) {
        res.status(500);
        console.log(err);
    }
}


export const getEventsForHeroController = async (req, res) => {
    try {
        const hero = parseInt(req.params.id);
        let results = await getEventsForHeroService(hero);
        res.status(200).json(results);
    }
    catch (err) {
        res.status(500).json({msg: 'Wrong number format'});
        console.log(err);
    }
}
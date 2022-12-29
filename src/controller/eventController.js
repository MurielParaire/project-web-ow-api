import {getAllEventsService, modifyEventByIdService, deleteEventByIdService, getSomeEventsService, getEventByIdService, getEventByTypeService, createEventService} from '../services/eventService.js'
import Jwt from 'jsonwebtoken'


export const getAllEventsController = async (req, res) => {
    try {
        let keys = Object.keys(req.headers);
        let limit = false;
        let offset = false;
        let results = 0;
        keys.forEach(key => {
            if (key === 'offset') {
                offset = true;
            }
            else if (key === 'limit') {
                limit = true;
            }
        })
        if (limit === true && offset === true) {
            results = await getSomeEventsService(req.header('limit'), req.header('offset'));
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
        let jwt = req.header('authorization');
        jwt = jwt.replace('"', '');
        jwt = jwt.replace('"', '');
        jwt = Jwt.verify(jwt, 'secret');
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
        let jwt = req.header('authorization');
        jwt = jwt.replace('"', '');
        jwt = jwt.replace('"', '');
        jwt = Jwt.verify(jwt, 'secret');
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
        console.log(id)
        let jwt = req.header('authorization');
        jwt = jwt.replace('"', '');
        jwt = jwt.replace('"', '');
        jwt = Jwt.verify(jwt, 'secret');
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
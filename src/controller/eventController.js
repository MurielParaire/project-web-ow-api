import {getAllEventsService, getEventByIdService, getEventByTypeService} from '../services/eventService.js'

export const getAllEventsController = async (req, res) => {
    try {
        let results = await getAllEventsService();
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
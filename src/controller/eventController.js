import {getAllEventsService, getEventsForHeroService, getEventTypesService, modifyEventByIdService, deleteEventByIdService, getSomeEventsService, getEventByIdService, getEventByTypeService, createEventService} from '../services/eventService.js'
import { getJWT } from './token.js';


/* Description: returns all (or a limited number of) the events
 * Arguments: 
 *     - req (required) : http request
 *             > Query : 
 *                     - limit (optional) : maximum number of events returned
 *                     - offset (optional) : index of where to start / offset for collecting the events
 *     - res (required) : instance of server response => where the controller sends all the answers
 * Returns : a list of all the events
 * */
export const getAllEventsController = async (req, res) => {
    try {
        let results = 0;
        if ('limit' in req.query && 'offset' in req.query) {
            results = await getSomeEventsService(parseInt(req.query.limit), parseInt(req.query.offset));
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


/* Description: returns an event by its id
 * Arguments: 
 *     - req (required) : http request
 *             > Path : 
 *                     - id (required) : the id of the event
 *     - res (required) : instance of server response => where the controller sends all the answers
 * Returns : the event's information
 * */
export const getEventByIdController = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        let results = await getEventByIdService(id);
        res.status(200).json(results);
    }
    catch (err) {
        res.status(500);
        console.log(err);
    }
}


/* Description: returns all the different event types
 * Arguments: 
 *     - req (required) : http request
 *     - res (required) : instance of server response => where the controller sends all the answers
 * Returns : a list of all the event types
 * */
export const getEventTypesController = async (req, res) => {
    try {
        let results = await getEventTypesService();
        res.status(200).json(results);
    }
    catch (err) {
        res.status(500);
        console.log(err);
    }
}


/* Description: returns all the events of a specific type
 * Arguments: 
 *     - req (required) : http request
 *             > Path : 
 *                     - type (required) : the specified type
 *     - res (required) : instance of server response => where the controller sends all the answers
 * Returns : a list of all the events with that type
 * */
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


/* Description: get all the events for a specific hero
 * Arguments: 
 *     - req (required) : http request
 *             > Path : 
 *                     - id (required) : the id of the event
 *     - res (required) : instance of server response => where the controller sends all the answers
 * Returns : 1 if it went back, 0 if there was an error
 * */
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


/* Description: create a new event
 * Arguments: 
 *     - req (required) : http request
 *             > Header : 
 *                     - auth (required) : the jwt token of the user
 *             > Body : 
 *                     - event (required) : the new event's information
 *     - res (required) : instance of server response => where the controller sends all the answers
 * Returns : 1 if it went back, 0 if there was an error
 * */
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


/* Description: delete an event
 * Arguments: 
 *     - req (required) : http request
 *             > Header : 
 *                     - auth (required) : the jwt token of the user
 *             > Path : 
 *                     - id (required) : the event's id
 *     - res (required) : instance of server response => where the controller sends all the answers
 * Returns : 1 if it went back, 0 if there was an error
 * */
export const deleteEventByIdController = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
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


/* Description: modify an existing event
 * Arguments: 
 *     - req (required) : http request
 *             > Header : 
 *                     - auth (required) : the jwt token of the user
 *             > Body : 
 *                     - event (required) : the event's information
 *     - res (required) : instance of server response => where the controller sends all the answers
 * Returns : 1 if it went back, 0 if there was an error
 * */
export const modifyEventByIdController = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
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



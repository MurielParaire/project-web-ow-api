import { getHeroByNameDB } from '../database/characterDB.js';
import { getAllEventsDB, getEventsWithoutHeroDB, getEventTypesDB, getEventsForHeroDB, deleteEventByIdDB, modifyEventByIdDB, getSomeEventsDB, getEventByIdDB, getEventByTypeDB, createEventDB } from '../database/eventDB.js'
import { getUserByIdDB } from '../database/userDB.js'
import { getRoles } from '../services/userService.js'


/* Description: returns all  events
 * Returns : a list of all the events
 * */
export async function getAllEventsService() {
    let result = await getAllEventsDB();
    return result;
}


/* Description: get a list of some events
 * Arguments: 
 *     - limit (required) : the maximal number of events to return
 *     - offset (required) : the offset to get the events 
 * Returns : a list of some events or an error message in case an error is thrown
 * */
export async function getSomeEventsService(limit, offset) {
    try {
        limit = parseInt(limit);
        offset = parseInt(offset);
        let result = await getSomeEventsDB(limit, offset);
        return result;
    }
    catch (err) {
        console.log(err);
        return err.err;
    }

}


/* Description: get an event by its id
 * Arguments: 
 *     - id (required) : the id of the event
 * Returns : the event or an error message in case an error is thrown
 * */
export async function getEventByIdService(id) {
    try {
        id = parseInt(id);
        let result = await getEventByIdDB(id);
        return result;
    }
    catch (err) {
        console.log(err);
        return err.err;
    }
}


/* Description: get a list of all the events of the specified type
 * Arguments: 
 *     - type (required) : the event type
 * Returns : a list of all the events of the specified type or an error message in case an error is thrown
 * */
export async function getEventByTypeService(type) {
    try {
        if (type.indexOf(' ') > 0 || (type !== 'kill' && type !== 'help' && type !== 'res' && type !== 'immobile' && type !== 'protect' && type !== 'heal')) {
            return {msg: "type has to be one of the following: 'kill', 'help', 'res', 'immobile', 'protect', 'heal'"}
        }
        let result = await getEventByTypeDB(type);
        return result;
    }
    catch (err) {
        console.log(err);
        return err.err;
    }
}


/* Description: get a list of all the event types
 * Returns : a list of all the event types or an error message in case an error is thrown
 * */
export async function getEventTypesService() {
    try {
        let result = await getEventTypesDB();
        return result;
    }
    catch (err) {
        console.log(err);
        return err.err;
    }
}


/* Description: get a list of all the events for the specified hero
 * Arguments: 
 *     - hero (required) : the id of the hero
 * Returns : a list of all the events for the specified hero or an error message in case an error is thrown
 * */
export async function getEventsForHeroService(hero) {
    try {
        hero = parseInt(hero);
        if (hero === 0) {
            //get all events that don't have a specified hero
            let result = await getEventsWithoutHeroDB();
            return result;
        }
        let result = await getEventsForHeroDB(hero);
        return result;
    }
    catch (err) {
        console.log(err);
        return err.err;
    }
}


/* Description: create a new event
 * Arguments: 
 *     - jwt (required) : the resolved jwt token of the user containing his id
 *     - event (required) : the information of the new event
 * Returns : 1 if it worked, 0 if it didn't or an error message in case an error is thrown
 * */ 
export async function createEventService(jwt, event) {
    try {
        //make sure the user has the role manager and is therefore allowed to modify an event
        let user = await getUserByIdDB(jwt.userId);
        user.roles = getRoles(user.roles);
        let result = 0;
        if (user.roles.manager === true) {
            if (event.character === 0) {
                event.character = null;
            }
            else {
                let character = getHeroByNameDB(event.character);
                if (character != 0) {
                    event.character = character.id_char;
                }
                else {
                    event.character = null;
                }
            }
            result = await createEventDB(event);
            return result;
        }
        return 0;
    }
    catch (err) {
        console.log(err);
        return err.err;
    }
}


/* Description: delete an event
 * Arguments: 
 *     - jwt (required) : the resolved jwt token of the user containing his id
 *     - id (required) : the id of the event
 * Returns : 1 if it worked, 0 if it didn't or an error message in case an error is thrown
 * */ 
export async function deleteEventByIdService(jwt, id) {
    try {
        id = parseInt(id);
        //make sure the user has the role manager and is therefore allowed to modify an event
        let user = await getUserByIdDB(jwt.userId);
        user.roles = getRoles(user.roles);
        let result = 0;
        if (user.roles.manager === true) {
            result = await deleteEventByIdDB(id);
        }
        return result;
    }
    catch (err) {
        console.log(err);
        return {msg: 'Please verify your inputs'};
    }
}


/* Description: modify an existing event
 * Arguments: 
 *     - jwt (required) : the resolved jwt token of the user containing his id
 *     - event (required) : the modified information of the event
 * Returns : 1 if it worked, 0 if it didn't or an error message in case an error is thrown
 * */
export async function modifyEventByIdService(jwt, event) {
    try {
        //make sure the user has the role manager and is therefore allowed to modify an event
        let user = await getUserByIdDB(jwt.userId);
        user.roles = getRoles(user.roles);
        let result = 0;
        if (user.roles.manager === true) {
            if ('name' in event) {
                if (event.name !== 0 && event.name !== null && event.name !== "") {
                    let hero = await getHeroByNameDB(event.name);
                    if (hero.length > 0) {
                        event.character = hero[0].id_char;
                    }
                }
                result = await modifyEventByIdDB(event);
            }
        }
        else {
            return { msg: 'You are not allowed to modify any events.' }
        }
        return result;
    }
    catch (err) {
        console.log(err);
        return err.err;
    }
}



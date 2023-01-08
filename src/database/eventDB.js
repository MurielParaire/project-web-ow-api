import { public_pool } from './connection_details/connection_public.js'
import { manager_pool } from './connection_details/connection_manager.js';


/* Description: get all events
 * Returns : the list of events or an error message in case an error is thrown
 * */
export async function getAllEventsDB() {
    try {
        let results = await public_pool.query('select type, e.description, name, e.event_id from event e left join character c on e.character = c.id_char order by event_id ;');
        return results.rows;
    }
    catch (err) {
        console.log(err);
        return {msg: 'Sorry but there was a problem.'};
    }
}


/* Description: get a list of some events
 * Arguments: 
 *     - limit (required) : the maximal number of events to return
 *     - offset (required) : the offset to get the events 
 * Returns : a list of some events or an error message in case an error is thrown
 * */
export async function getSomeEventsDB(limit, offset) {
    try {
        let results = await public_pool.query('select e.event_id, c.name, e.description, e.type from event e left join character c on e.character = c.id_char order by e.event_id offset( $1 ) limit( $2 );', [offset, limit]);
        return results.rows;
    }
    catch (err) {
        console.log(err);
        return {msg: 'Sorry but there was a problem.'};
    }
}


/* Description: get an event by its id
 * Arguments: 
 *     - id (required) : the id of the event
 * Returns : a list of some events or an error message in case an error is thrown
 * */
export async function getEventByIdDB(id) {
    try {
        let results = await public_pool.query('select * from event where event_id = $1;', [id]);
        if (results.rows.length > 0) {
            return results.rows;
          }
        return 0;
    }
    catch (err) {
        console.log(err);
        return {msg: 'Sorry but there was a problem.'};
    }
}


/* Description: get an event by its type
 * Arguments: 
 *     - type (required) : the type of the event
 * Returns : a list of some events or an error message in case an error is thrown
 * */
export async function getEventByTypeDB(type) {
    try {
        let results = await public_pool.query('select * from event where type = $1;', [type]);
        if (results.rows.length > 0) {
            return results.rows;
          }
        return 0;
    }
    catch (err) {
        console.log(err);
        return {msg: 'Sorry but there was a problem. Please verify your type input.'};
    }
}


/* Description: get an event by its type
 * Arguments: 
 *     - type (required) : the type of the event
 * Returns : a list of some events or an error message in case an error is thrown
 * */
export async function getEventTypesDB() {
    try {
        let results = await public_pool.query('select distinct type from event;', []);
        if (results.rows.length > 0) {
            return results.rows;
          }
        return 0;
    }
    catch (err) {
        console.log(err);
        return {msg: 'Sorry but there was a problem.'};
    }
}


/* Description: get the events for the specified hero
 * Arguments: 
 *     - hero (required) : the id of the hero
 * Returns : a list of the heroes events or an error message in case an error is thrown
 * */
export async function getEventsForHeroDB(hero) {
    try {
        let results = await public_pool.query('select * from event where character = $1;', [hero]);
        if (results.rows.length > 0) {
            return results.rows;
          }
        return 0;
    }
    catch (err) {
        console.log(err);
        return {msg: 'Sorry but there was a problem.'};
    }
}


/* Description: get the events for the specified hero
 * Returns : a list of all events without a specified hero or an error message in case an error is thrown
 * */
export async function getEventsWithoutHeroDB() {
    try {
        let results = await public_pool.query('select * from event where character is null;', []);
        if (results.rowCount > 0) {
            return results.rows;
          }
        return 0;
    }
    catch (err) {
        console.log(err);
        return {msg: 'Sorry but there was a problem.'};
    }
}


/* Description: create a new event
 * Arguments: 
 *     - event (required) : the event's information
 * Returns : 1 if it worked, 0 if it didn't or an error message in case an error is thrown
 * */
export async function createEventDB(event) {
    try {
        let results = await manager_pool.query('INSERT INTO event (type, description, character) Values ($1, $2, $3);', [event.type, event.description, event.character]);
        return results.rowCount;
    }
    catch (err) {
        console.log(err);
        return {msg: 'Sorry but there was a problem. Please verify your inputs.'};
    }
}


/* Description: delete an event by its id
 * Arguments: 
 *     - id (required) : the id of the event
 * Returns : 1 if it worked, 0 if it didn't or an error message in case an error is thrown
 * */
export async function deleteEventByIdDB(id) {
    try {
        let results = await manager_pool.query('delete from event where event_id= $1 ;', [id]);
        return results.rowCount;
    }
    catch (err) {
        console.log(err);
        return {msg: 'Sorry but there was a problem.'};
    }
}


/* Description: modify an event
 * Arguments: 
 *     - event (required) : the information (including the id) of the event
 * Returns : 1 if it worked, 0 if it didn't or an error message in case an error is thrown
 * */
export async function modifyEventByIdDB(event) {
    try {
        let results = await manager_pool.query('update event set type = $1, description = $2, character = $3 where event_id = $4', [event.type, event.description, event.character, event.event_id]);
        return results.rowCount;
    }
    catch (err) {
        console.log(err);
        return {msg: 'Sorry but there was a problem. Please verify your inputs'};
    }
}

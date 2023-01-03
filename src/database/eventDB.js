import { public_pool } from './connection_details/connection_public.js'
import { manager_pool } from './connection_details/connection_manager.js';

export async function getAllEventsDB() {
    try {
        let results = await public_pool.query('select type, e.description, name, e.event_id from event e left join character c on e.character = c.id_char;');
        return results.rows;
    }
    catch (err) {
        return {msg: err.message};
    }
}


export async function getSomeEventsDB(limit, offset) {
    try {
        let results = await public_pool.query('select e.event_id, c.name, e.description, e.type from event e left join character c on e.character = c.id_char order by e.event_id offset( $1 ) limit( $2 );', [offset, limit]);
        return results.rows;
    }
    catch (err) {
        console.log(err)
        return {msg: err.message};
    }
}



export async function getEventByIdDB(id) {
    try {
        let results = await public_pool.query('select * from event where event_id = $1;', [id]);
        if (results.rows.length > 0) {
            return results.rows;
          }
        return 0;
    }
    catch (err) {
        return {msg: err.message};
    }
}

export async function getEventByTypeDB(type) {
    try {
        let results = await public_pool.query('select * from event where type = $1;', [type]);
        if (results.rows.length > 0) {
            return results.rows;
          }
        return 0;
    }
    catch (err) {
        return {msg: err.message};
    }
}


export async function createEventDB(event) {
    try {
        let results = await manager_pool.query('INSERT INTO event (type, description, character) Values ($1, $2, $3);', [event.type, event.description, event.character]);
        return results.rowCount;
    }
    catch (err) {
        return {msg: err.message};
    }
}


export async function deleteEventByIdDB(id) {
    try {
        let results = await manager_pool.query('delete from event where event_id= $1 ;', [id]);
        return results.rowCount;
    }
    catch (err) {
        console.log(err)
        return {msg: err.message};
    }
}

export async function modifyEventByIdDB(event) {
    try {
        let results = await manager_pool.query('update event set type = $1, description = $2, character = $3 where event_id = $4', [event.type, event.description, event.character, event.event_id]);
        return results.rowCount;
    }
    catch (err) {
        console.log(err)
        return {msg: err.message};
    }
}

export async function getEventsForHeroDB(hero) {
    try {
        let results = await public_pool.query('select * from event where character = $1;', [hero]);
        if (results.rows.length > 0) {
            return results.rows;
          }
        return 0;
    }
    catch (err) {
        return {msg: err.message};
    }
}

export async function getEventsWithoutHeroDB() {
    try {
        let results = await public_pool.query('select * from event where character is null;', []);
        if (results.rows.length > 0) {
            return results.rows;
          }
        return 0;
    }
    catch (err) {
        return {msg: err.message};
    }
}
import { public_pool } from './connection_details/connection_public.js'
import { basic_admin_pool } from './connection_details/connection_admin.js';

export async function getAllEventsDB() {
    try {
        let results = await public_pool.query('select type, e.description, name from event e left join character c on e.character = c.id_char;');
        return results.rows;
    }
    catch (err) {
        return {msg: err.message};
    }
}


export async function getSomeEventsDB(limit, offset) {
    try {
        let results = await public_pool.query('select event_id, type, e.description, name from event e left join character c on e.character = c.id_char offset( $1 ) limit( $2 );', [offset, limit]);
        return results.rows;
    }
    catch (err) {
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
        let results = await basic_admin_pool.query('INSERT INTO event (type, description, character) Values ($1, $2, $3);', [event.type, event.description, event.character]);
        return results.rowCount;
    }
    catch (err) {
        return {msg: err.message};
    }
}


export async function deleteEventByIdDB(id) {
    try {
        console.log(id)
        let results = await basic_admin_pool.query('delete from event where event_id= $1 ;', [id]);
        return results.rowCount;
    }
    catch (err) {
        console.log(err)
        return {msg: err.message};
    }
}
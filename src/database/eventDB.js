import { public_pool } from './connection_details/connection_public.js'

export async function getAllEventsDB() {
    try {
        let results = await public_pool.query('select * from event;');
        return results.rows;
    }
    catch (err) {
        console.log(err);
        return 0;
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
        console.log(err);
        return 0;
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
        console.log(err);
        return 0;
    }
}
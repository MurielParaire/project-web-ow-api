import { public_pool } from './connection_details/connection_public.js'


export async function getAllHeroesDB() {
    try {
        let results = await public_pool.query('SELECT * FROM character ;');
        return results.rows;
    }
    catch (err) {
        console.log(err);
        return 0;
    }
}

export async function getHeroByIdDB(id) {
    try {
        let results = await public_pool.query('SELECT * FROM character WHERE character.id_char = $1;', [id.toString()]);
        return results.rows;
    }
    catch (err) {
        console.log(err);
        return 0;
    }
}

export async function getHeroByNameDB(name) {
    try {
        let results = await public_pool.query('SELECT * FROM character WHERE character.name = $1;', [name]);
        return results.rows;
    }
    catch (err) {
        console.log(err);
        return 0;
    }
}

export async function getEventsOfHeroByNameDB(name) {
    try {
        let results = await public_pool.query('select image, name, type, event.description from event join character on event.character = character.id_char WHERE character.name = $1;', [name]);
        if (results.rows.length > 0) {
          return results.rows;
        }
        else {
           return 0;
        } 
    }
    catch (err) {
        console.log(err);
        return 0;
    }
}

//need image of hero for my app
export async function getImageOfHeroByNameDB(name) {
    try {
        let results = await public_pool.query('select image from character WHERE character.name = $1;', [name]);
        if (results.rows.length > 0) {
          return results.rows;
        }
        else {
           return 0;
        } 
    }
    catch (err) {
        console.log(err);
        return 0;
    }
}
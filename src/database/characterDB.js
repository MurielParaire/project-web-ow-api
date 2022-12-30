import { basic_admin_pool } from './connection_details/connection_admin.js';
import { public_pool } from './connection_details/connection_public.js'


export async function getAllHeroesDB() {
    try {
        let results = await public_pool.query('SELECT * FROM character ;');
        return results.rows;
    }
    catch (err) {
        return {msg: err.message};
    }
}

export async function getSomeHeroesDB(limit, offset) {
    try {
        let results = await public_pool.query('SELECT * FROM character offset( $1 ) limit( $2 );', [offset, limit]);
        return results.rows;
    }
    catch (err) {
        return {msg: err.message};
    }
}

export async function getHeroByIdDB(id) {
    try {
        let results = await public_pool.query('SELECT * FROM character WHERE character.id_char = $1;', [id.toString()]);
        return results.rows;
    }
    catch (err) {
        return {msg: err.message};
    }
}

export async function getHeroByNameDB(name) {
    try {
        let results = await public_pool.query('SELECT * FROM character WHERE character.name = $1;', [name]);
        return results.rows;
    }
    catch (err) {
        return {msg: err.message};
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
        return {msg: err.message};
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
        return {msg: err.message};
    }
}

export async function createHeroDB(hero) {
    try {
        let results = await basic_admin_pool.query('insert into character (name, role, description, image) values ($1, $2, $3, $4);', [hero.name, hero.role, hero.description, hero.image]);
        return results.rowCount;
    }
    catch (err) {
        return {msg: err.message};
    }
}


export async function getHeroesByTypeDB(type) {
    try {
        let results = await basic_admin_pool.query('select * from character where role= $1 ;', [type]);
        if (results.rows.length > 0) {
          return results.rows;
        }
        else {
           return 0;
        } 
    }
    catch (err) {
        return {msg: err.message};
    }
}


export async function deleteHeroByIdDB(id) {
    try {
        console.log(id)
        let results = await basic_admin_pool.query('delete from character where id_char=$1;', [id]);
        return results.rowCount;
    }
    catch (err) {
        console.log(err)
        return {msg: err.message};
    }
}


export async function modifyHeroByIdDB(hero) {
    try {
        console.log(hero)
        let results = await basic_admin_pool.query('update character set name = $1, role = $2, description = $3, image = $4 where id_char = $5', [hero.name, hero.role, hero.description, hero.image, hero.id_char]);
        return results.rowCount;
    }
    catch (err) {
        console.log(err)
        return {msg: err.message};
    }
}
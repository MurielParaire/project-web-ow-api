import { supervisor_pool } from './connection_details/connection_supervisor.js';
import { public_pool } from './connection_details/connection_public.js'


/* Description: get all heroes
 * Returns : the list of heroes or an error message in case an error is thrown
 * */
export async function getAllHeroesDB() {
    try {
        let results = await public_pool.query('SELECT * FROM character order by id_char ;');
        return results.rows;
    }
    catch (err) {
        console.log(err);
        return {msg: 'Sorry but there was a problem.'};
    }
}


/* Description: get a list of some heroes
 * Arguments: 
 *     - limit (required) : the maximal number of heroes to return
 *     - offset (required) : the offset to get the heroes 
 * Returns : a list of some heroes or an error message in case an error is thrown
 * */
export async function getSomeHeroesDB(limit, offset) {
    try {
        let results = await public_pool.query('SELECT * FROM character order by id_char offset( $1 ) limit( $2 );', [offset, limit]);
        return results.rows;
    }
    catch (err) {
        console.log(err);
        return {msg: 'Sorry but there was a problem.'};
    }
}


/* Description: get a hero by his/her id
 * Arguments: 
 *     - id (required) : the id of the hero
 * Returns : a list of some heroes or an error message in case an error is thrown
 * */
export async function getHeroByIdDB(id) {
    try {
        let results = await public_pool.query('SELECT * FROM character WHERE character.id_char = $1;', [id.toString()]);
        return results.rows;
    }
    catch (err) {
        console.log(err);
        return {msg: 'Sorry but there was a problem with finding the specified character. Please reload your page and retry again in a few moments'};
    }
}


/* Description: get a hero by his/her name
 * Arguments: 
 *     - name (required) : the name of the hero
 * Returns : a list containing the specified hero or an error message in case an error is thrown
 * */
export async function getHeroByNameDB(name) {
    try {
        let results = await public_pool.query('SELECT * FROM character WHERE character.name = $1;', [name]);
        return results.rows;
    }
    catch (err) {
        console.log(err);
        return {msg: 'Sorry but there was a problem with finding the specified character. Please reload your page and retry again in a few moments'};
    }
}


/* Description: gets all the heroes of the specified role
 * Arguments: 
 *     - role (required) : the role of the heroes
 * Returns : a list of the heroes having that role or an error message in case an error is thrown
 * */
export async function getHeroesByRoleDB(role) {
    try {
        let results = await public_pool.query('select * from character where role= $1  order by name;', [role]);
        if (results.rows.length > 0) {
          return results.rows;
        }
        else {
           return 0;
        } 
    }
    catch (err) {
        console.log(err);
        return {msg: 'Sorry but there was a problem. Please verify the role.'};
    }
}


/* Description: get the events of a hero by his/her name
 * Arguments: 
 *     - name (required) : the name of the hero
 * Returns : a list of the events of the specified hero or an error message in case an error is thrown
 * */
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
        return {msg: 'Sorry but there was a problem.'};
    }
}


/* Description: gets the image of a hero by his/her name
 * Arguments: 
 *     - name (required) : the name of the hero
 * Returns : a list containing the image of the hero or an error message in case an error is thrown
 * */
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
        return {msg: 'Sorry but there was a problem.'};
    }
}


/* Description: create a new hero
 * Arguments: 
 *     - hero (required) : the hero's information
 * Returns : 1 if it worked, 0 if it didn't or an error message in case an error is thrown
 * */
export async function createHeroDB(hero) {
    try {
        let results = await supervisor_pool.query('insert into character (name, role, description, image) values ($1, $2, $3, $4);', [hero.name, hero.role, hero.description, hero.image]);
        return results.rowCount;
    }
    catch (err) {
        console.log(err);
        return {msg: 'Sorry but the hero could not be created. Please verify your inputs.'};
    }
}


/* Description: delete a hero by his/her id
 * Arguments: 
 *     - id (required) : the id of the hero
 * Returns : 1 if it worked, 0 if it didn't or an error message in case an error is thrown
 * */
export async function deleteHeroByIdDB(id) {
    try {
        let results = await supervisor_pool.query('delete from character where id_char=$1;', [id]);
        return results.rowCount;
    }
    catch (err) {
        console.log(err)
        console.log(err);
        return {msg: 'Sorry but there was a problem. This hero could not be deleted'};
    }
}


/* Description: modify a hero
 * Arguments: 
 *     - hero (required) : the information (including the id) of the hero
 * Returns : 1 if it worked, 0 if it didn't or an error message in case an error is thrown
 * */
export async function modifyHeroByIdDB(hero) {
    try {
        let results = await supervisor_pool.query('update character set name = $1, role = $2, description = $3, image = $4 where id_char = $5', [hero.name, hero.role, hero.description, hero.image, hero.id_char]);
        return results.rowCount;
    }
    catch (err) {
        console.log(err);
        return {msg: 'Sorry but there was a problem.'};
    }
}

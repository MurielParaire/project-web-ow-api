import { getAllHeroesDB, getSomeHeroesDB, modifyHeroByIdDB, deleteHeroByIdDB, getHeroesByRoleDB, getHeroByIdDB, getHeroByNameDB, getEventsOfHeroByNameDB, getImageOfHeroByNameDB, createHeroDB } from '../database/characterDB.js'
import { getUserByIdDB } from '../database/userDB.js';
import { getRoles } from './userService.js';


/* Description: returns all  heroes
 * Returns : a list of all the heroes
 * */
export async function getAllHeroesService() {
    let result = await getAllHeroesDB();
    return result;
}


/* Description: get a list of some heroes
 * Arguments: 
 *     - limit (required) : the maximal number of heroes to return
 *     - offset (required) : the offset to get the heroes 
 * Returns : a list of some heroes or an error message in case an error is thrown
 * */
export async function getSomeHeroesService(limit, offset) {
    try {
        //converting the limit and offset to Integers
        limit = BigInt(limit);
        offset = BigInt(offset);
        let result = await getSomeHeroesDB(limit, offset);
        return result;
    }
    catch (err) {
        return err.err;
    }

}


/* Description: get a hero by his id
 * Arguments: 
 *     - id (required) : the hero's id
 * Returns : the hero's information or an error message in case an error is thrown
 * */
export async function getHeroByIdService(id) {
    let result = await getHeroByIdDB(id);
    return result;
}


/* Description: get a hero by his name
 * Arguments: 
 *     - name (required) : the name of the hero
 * Returns : the hero's information or an error message in case an error is thrown
 * */
export async function getHeroByNameService(name) {
    name = name.charAt(0).toUpperCase() + name.slice(1);
    let result = await getHeroByNameDB(name);
    return result;
}


/* Description: get a list of all the events linked to a specific hero
 * Arguments: 
 *     - name (required) : the name of the hero
 * Returns : a list of all the events linked to the specific hero or an error message in case an error is thrown
 * */
export async function getEventsOfHeroByNameService(name) {
    name = name.charAt(0).toUpperCase() + name.slice(1);
    let result = await getEventsOfHeroByNameDB(name);
    //in my frontend I call this function for my combat creating script and I need the images from the heroes
    if (result === 0) {
        result = await getImageOfHeroByNameDB(name);
    }
    return result;
}


/* Description: get a list of all the heroes of the specified role
 * Arguments: 
 *     - role (required) : the role of the heroes
 * Returns : a list of all the heroes with the specified role or an error message in case an error is thrown
 * */
export async function getHeroesByRoleService(role) {
    role = role.toLowerCase();
    if (role !== 'dps' && role !== 'support' && role !== 'tank') {
        return 0;
    }
    if (role === 'dps') {
        role = 'DPS';
    }
    else if (role === 'support') {
        role = 'Support';
    }
    else if (role === 'tank') {
        role = 'Tank';
    }
    let result = await getHeroesByRoleDB(role);
    return result;
}


/* Description: create a new hero
 * Arguments: 
 *     - jwt (required) : the resolved jwt token of the user containing his id
 *     - hero (required) : the information of the new hero
 * Returns : 1 if it worked, 0 if it didn't or an error message in case an error is thrown
 * */ 
export async function createHeroService(jwt, hero) {
    //make sure the user has the role supervisor and is therefore allowed to modify a hero
    let user = await getUserByIdDB(jwt.userId);
    user.roles = getRoles(user.roles);
    let result = 0;
    if (user.roles.supervisor === true) {
        result = await createHeroDB(hero);
    }
    return result;
}


/* Description: delete a hero
 * Arguments: 
 *     - jwt (required) : the resolved jwt token of the user containing his id
 *     - id (required) : the id of the hero
 * Returns : 1 if it worked, 0 if it didn't or an error message in case an error is thrown
 * */ 
export async function deleteHeroByIdService(jwt, id) {
    //make sure the user has the role supervisor and is therefore allowed to modify a hero
    let user = await getUserByIdDB(jwt.userId);
    user.roles = getRoles(user.roles);
    let result = 0;
    if (user.roles.supervisor === true) {
        result = await deleteHeroByIdDB(id);
    }
    return result;
}


/* Description: modify an existing hero
 * Arguments: 
 *     - jwt (required) : the resolved jwt token of the user containing his id
 *     - hero (required) : the modified information of the hero
 * Returns : 1 if it worked, 0 if it didn't or an error message in case an error is thrown
 * */ 
export async function modifyHeroByIdService(jwt, hero) {
    //make sure the user has the role supervisor and is therefore allowed to modify a hero
    let user = await getUserByIdDB(jwt.userId);
    user.roles = getRoles(user.roles);
    let result = 0;
    if (user.roles.supervisor === true) {
        result = await modifyHeroByIdDB(hero);
    }
    else {
        return { msg: 'You are not allowed to modify any heroes.' }
    }
    return result;
}
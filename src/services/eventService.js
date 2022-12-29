import { getHeroByNameDB } from '../database/characterDB.js';
import { getAllEventsDB, deleteEventByIdDB, modifyEventByIdDB, getSomeEventsDB, getEventByIdDB, getEventByTypeDB, createEventDB } from '../database/eventDB.js'
import { getUserByIdDB } from '../database/userDB.js'
import { getRoles } from '../services/userService.js'


export async function getAllEventsService() {
    let result = await getAllEventsDB();
    return result;
}

export async function getSomeEventsService(limit, offset) {
    try {
        limit = BigInt(limit);
        offset = BigInt(offset);
        let result = await getSomeEventsDB(limit, offset);
        return result;
    }
    catch (err) {
        console.log(err);
        return err.err;
    }

}

export async function getEventByIdService(id) {
    let result = await getEventByIdDB(id);
    return result;
}

export async function getEventByTypeService(type) {
    let result = await getEventByTypeDB(type);
    return result;
}

export async function createEventService(jwt, event) {
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
    let user = await getUserByIdDB(jwt.userId);
    user.roles = getRoles(user.roles);
    let result = 0;
    if (user.roles.manager === true) {
        result = await createEventDB(event);
        return result;
    }
    return 0;
}


export async function deleteEventByIdService(jwt, id) {
    let user = await getUserByIdDB(jwt.userId);
    user.roles = getRoles(user.roles);
    let result = 0;
    if (user.roles.manager === true) {
        result = await deleteEventByIdDB(id);
    }
    return result;
}


export async function modifyEventByIdService(jwt, event) {
    let user = await getUserByIdDB(jwt.userId);
    user.roles = getRoles(user.roles);
    let result = 0;
    if (user.roles.manager === true) {
        result = await modifyEventByIdDB(event);
    }
    else {
        return { msg: 'You are not allowed to modify any events.' }
    }
    return result;
}
import { getHeroByNameDB } from '../database/characterDB.js';
import { getAllEventsDB, getEventsWithoutHeroDB, getEventsForHeroDB, deleteEventByIdDB, modifyEventByIdDB, getSomeEventsDB, getEventByIdDB, getEventByTypeDB, createEventDB } from '../database/eventDB.js'
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
    try {
        let result = await getEventByIdDB(id);
        return result;
    }
    catch (err) {
        console.log(err);
        return err.err;
    }
}

export async function getEventByTypeService(type) {
    try {
        let result = await getEventByTypeDB(type);
        return result;
    }
    catch (err) {
        console.log(err);
        return err.err;
    }
}

export async function createEventService(jwt, event) {
    try {
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
    catch (err) {
        console.log(err);
        return err.err;
    }
}


export async function deleteEventByIdService(jwt, id) {
    try {
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
        return err.err;
    }
}


export async function modifyEventByIdService(jwt, event) {
    try {
        let user = await getUserByIdDB(jwt.userId);
        user.roles = getRoles(user.roles);
        let result = 0;
        if (user.roles.manager === true) {
            let hero = await getHeroByNameDB(event.name);
            if (hero.length > 0) {
                event.character = hero[0].id_char;
            }
            result = await modifyEventByIdDB(event);
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


export async function getEventsForHeroService(hero) {
    try {
        if (hero === 0) {
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
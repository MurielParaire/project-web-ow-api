import { getAllHeroesDB, getSomeHeroesDB, modifyHeroByIdDB, deleteHeroByIdDB, getHeroesByTypeDB, getHeroByIdDB, getHeroByNameDB, getEventsOfHeroByNameDB, getImageOfHeroByNameDB, createHeroDB } from '../database/characterDB.js'
import { getUserByIdDB } from '../database/userDB.js';
import { getRoles } from './userService.js';

export async function getAllHeroesService() {
    let result = await getAllHeroesDB();
    return result;
}

export async function getSomeHeroesService(limit, offset) {
    try {
        limit = BigInt(limit);
        offset = BigInt(offset);
        let result = await getSomeHeroesDB(limit, offset);
        return result;
    }
    catch (err) {
        console.log(err);
        return err.err;
    }

}

export async function getHeroByIdService(id) {
    let result = await getHeroByIdDB(id);
    return result;
}

export async function getHeroByNameService(name) {
    name = name.charAt(0).toUpperCase() + name.slice(1);
    let result = await getHeroByNameDB(name);
    return result;
}


export async function getEventsOfHeroByNameService(name) {
    name = name.charAt(0).toUpperCase() + name.slice(1);
    let result = await getEventsOfHeroByNameDB(name);
    if (result === 0) {
        result = await getImageOfHeroByNameDB(name);
    }
    return result;
}


export async function createHeroService(jwt, hero) {
    let user = await getUserByIdDB(jwt.userId);
    user.roles = getRoles(user.roles);
    let result = 0;
    if (user.roles.supervisor === true) {
        result = await createHeroDB(hero);
    }
    return result;
}

export async function getHeroesByTypeService(type) {
    type = type.toLowerCase();
    if (type !== 'dps' && type !== 'support' && type !== 'tank') {
        return 0;
    }
    if (type === 'dps') {
        type = 'DPS';
    }
    else if (type === 'support') {
        type = 'Support';
    }
    else if (type === 'tank') {
        type = 'Tank';
    }
    let result = await getHeroesByTypeDB(type);
    return result;
}


export async function deleteHeroByIdService(jwt, id) {
    let user = await getUserByIdDB(jwt.userId);
    user.roles = getRoles(user.roles);
    let result = 0;
    if (user.roles.supervisor === true) {
        result = await deleteHeroByIdDB(id);
    }
    return result;
}



export async function modifyHeroByIdService(jwt, hero) {
    console.log(hero)
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
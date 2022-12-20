import { getAllHeroesDB, getHeroByIdDB, getHeroByNameDB, getEventsOfHeroByNameDB, getImageOfHeroByNameDB } from '../database/characterDB.js'


export async function getAllHeroesService() {
    let result =  await getAllHeroesDB();
    return result;
}

export async function getHeroByIdService(id) {
    let result =  await getHeroByIdDB(id);
    return result;
}

export async function getHeroByNameService(name) {
    name = name.charAt(0).toUpperCase() + name.slice(1);
    let result =  await getHeroByNameDB(name);
    return result;
}


export async function getEventsOfHeroByNameService(name) {
    name = name.charAt(0).toUpperCase() + name.slice(1);
    let result =  await getEventsOfHeroByNameDB(name);
    if (result === 0) {
        result = await getImageOfHeroByNameDB(name);
    }
    return result;
}

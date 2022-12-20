import {getAllEventsDB, getEventByIdDB, getEventByTypeDB} from '../database/eventDB.js'

export async function getAllEventsService() {
    let result =  await getAllEventsDB();
    return result;
}

export async function getEventByIdService(id) {
    let result =  await getEventByIdDB(id);
    return result;
}

export async function getEventByTypeService(type) {
    let result =  await getEventByTypeDB(type);
    return result;
}
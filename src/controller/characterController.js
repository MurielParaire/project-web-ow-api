import { getHeroesByRoleService, modifyHeroByIdService, getSomeHeroesService, deleteHeroByIdService, getAllHeroesService, getHeroByIdService, getHeroByNameService, getEventsOfHeroByNameService, createHeroService } from '../services/characterService.js'
import { getJWT } from './token.js';


export const getAllHeroesController = async (req, res) => {
    try {
        let results = 0;
        console.log('query')
        console.log(req.query)
        if ('limit' in req.query && 'offset' in req.query) {
            results = await getSomeHeroesService(req.query.limit, req.query.offset);
        }
        else {
            results = await getAllHeroesService();
        }
        res.status(200).json(results);
    }
    catch (err) {
        console.log("j")
        res.status(500);
        console.log(err);
    }
}


export const getHeroByIdController = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        let results = await getHeroByIdService(id);
        res.status(200).json(results);
    }
    catch (err) {
        res.status(500);
        console.log(err);
    }
}


export const getHeroByNameController = async (req, res) => {
    try {
        const name = req.params.name;
        let results = await getHeroByNameService(name);
        res.status(200).json(results);
    }
    catch (err) {
        res.status(500);
        console.log(err);
    }
}

export const getEventsOfHeroByNameController = async (req, res) => {
    try {
        const name = req.params.name;
        let results = await getEventsOfHeroByNameService(name);
        res.status(200).json(results);
    }
    catch (err) {
        res.status(500);
        console.log(err);
    }
}


export const createHeroController = async (req, res) => {
    try {
        let jwt = req.header('auth');
        jwt = getJWT(jwt)
        if (jwt.status === 401) {
            res.status(401).json(jwt)
            return 0;
        }
        let hero = req.body;
        let results = await createHeroService(jwt, hero);
        res.status(200).json(results);
    }
    catch (err) {
        res.status(500);
        console.log(err);
    }
}


export const getHeroesByRoleController = async (req, res) => {
    try {
        const role = req.params.role;
        let results = await getHeroesByRoleService(role);
        res.status(200).json(results);
    }
    catch (err) {
        res.status(500);
        console.log(err);
    }
}


export const deleteHeroByIdController = async (req, res) => {
    try {
        const id = req.params.id;
        let jwt = req.header('auth');
        jwt = getJWT(jwt)
        if (jwt.status === 401) {
            res.status(401).json(jwt)
            return 0;
        }
        let results = await deleteHeroByIdService(jwt, id);
        res.status(200).json(results);
    }
    catch (err) {
        res.status(500);
        console.log(err);
    }
}


export const modifyHeroByIdController = async (req, res) => {
    try {
        const id = req.params.id;
        let jwt = req.header('auth');
        jwt = getJWT(jwt)
        if (jwt.status === 401) {
            res.status(401).json(jwt)
            return 0;
        }
        let hero = req.body;
        if (hero.id_char.toString() !== id.toString()) {
            return {msg: 'There was an error. Please reload your page and retry this operation.'};
        }
        let results = await modifyHeroByIdService(jwt, hero);
        res.status(200).json(results);
    }
    catch (err) {
        res.status(500);
        console.log(err);
    }
}
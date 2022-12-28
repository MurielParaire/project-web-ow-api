import { getHeroesByTypeService, getSomeHeroesService, deleteHeroByIdService, getAllHeroesService, getHeroByIdService, getHeroByNameService, getEventsOfHeroByNameService, createHeroService } from '../services/characterService.js'
import Jwt from 'jsonwebtoken'


export const getAllHeroesController = async (req, res) => {
    try {
        let keys = Object.keys(req.headers);
        let limit = false;
        let offset = false;
        let results = 0;
        keys.forEach(key => {
            if (key === 'offset') {
                offset = true;
            }
            else if (key === 'limit') {
                limit = true;
            }
        })
        if (limit === true && offset === true) {
            results = await getSomeHeroesService(req.header('limit'), req.header('offset'));
        }
        else {
            results = await getAllHeroesService();
        }
        res.status(200).json(results);
    }
    catch (err) {
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
        let jwt = req.header('authorization');
        jwt = jwt.replace('"', '');
        jwt = jwt.replace('"', '');
        jwt = Jwt.verify(jwt, 'secret');
        let hero = req.body;
        let results = await createHeroService(jwt, hero);
        res.status(200).json(results);
    }
    catch (err) {
        res.status(500);
        console.log(err);
    }
}


export const getHeroesByTypeController = async (req, res) => {
    try {
        const type = req.params.type;
        let results = await getHeroesByTypeService(type);
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
        let jwt = req.header('authorization');
        jwt = jwt.replace('"', '');
        jwt = jwt.replace('"', '');
        jwt = Jwt.verify(jwt, 'secret');
        let results = await deleteHeroByIdService(jwt, id);
        res.status(200).json(results);
    }
    catch (err) {
        res.status(500);
        console.log(err);
    }
}
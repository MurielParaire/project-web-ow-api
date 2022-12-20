import { getAllHeroesService, getHeroByIdService, getHeroByNameService, getEventsOfHeroByNameService } from '../services/characterService.js'


export const getAllHeroesController = async (req, res) => {
    try {
        let results = await getAllHeroesService();
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
    catch(err) {
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
    catch(err) {
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
    catch(err) {
        res.status(500);
        console.log(err);
    }
}

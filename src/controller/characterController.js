import { getHeroesByRoleService, modifyHeroByIdService, getSomeHeroesService, deleteHeroByIdService, getAllHeroesService, getHeroByIdService, getHeroByNameService, getEventsOfHeroByNameService, createHeroService } from '../services/characterService.js'
import { getJWT } from './token.js';


/* Description: returns all (or a limited number of) the heroes
 * Arguments: 
 *     - req (required) : http request
 *             > Query : 
 *                     - limit (optional) : maximum number of heroes returned
 *                     - offset (optional) : index of where to start / offset for collecting the heroes
 *     - res (required) : instance of server response => where the controller sends all the answers
 * Returns : a list of all the heroes
 * */
export const getAllHeroesController = async (req, res) => {
    try {
        let results = 0;
        if ('limit' in req.query && 'offset' in req.query) {
            results = await getSomeHeroesService(parseInt(req.query.limit), parseInt(req.query.offset));
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


/* Description: returns a hero by his id
 * Arguments: 
 *     - req (required) : http request
 *             > Path : 
 *                     - id (required) : id of the hero
 *     - res (required) : instance of server response => where the controller sends all the answers
 * Returns : the information of that specific hero
 * */
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


/* Description: returns a hero by his name
 * Arguments: 
 *     - req (required) : http request
 *             > Path : 
 *                     - name (required) : name of the hero
 *     - res (required) : instance of server response => where the controller sends all the answers
 * Returns : the information of the hero
 * */
export const getHeroByNameController = async (req, res) => {
    try {
        const name = req.params.name;
        if (name.length > 20) {
            res.status(500);
            return 0; 
        }
        let results = await getHeroByNameService(name);
        res.status(200).json(results);
    }
    catch (err) {
        res.status(500);
        console.log(err);
    }
}


/* Description: get all the heroes of a specific role
 * Arguments: 
 *     - req (required) : http request
 *             > Path : 
 *                     - role (required) : the role token of the heroes we want to get
 *     - res (required) : instance of server response => where the controller sends all the answers
 * Returns : the list of all the heroes
 * */
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


/* Description: returns all the events connected to one hero by his name
 * Arguments: 
 *     - req (required) : http request
 *             > Path : 
 *                     - name (required) : the name of the hero
 *     - res (required) : instance of server response => where the controller sends all the answers
 * Returns : a list of all the events of the specified hero
 * */
export const getEventsOfHeroByNameController = async (req, res) => {
    try {
        const name = req.params.name;
        if (name.length > 20) {
            res.status(500);
            return 0; 
        }
        let results = await getEventsOfHeroByNameService(name);
        res.status(200).json(results);
    }
    catch (err) {
        res.status(500);
        console.log(err);
    }
}


/* Description: create a new hero
 * Arguments: 
 *     - req (required) : http request
 *             > Header : 
 *                     - auth (required) : the jwt token of the user
 *             > Body : 
 *                     - hero (required) : the new hero's information
 *     - res (required) : instance of server response => where the controller sends all the answers
 * Returns : 1 if it went back, 0 if there was an error
 * */
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


/* Description: delete a hero by his id
 * Arguments: 
 *     - req (required) : http request
 *             > Header : 
 *                     - auth (required) : the jwt token of the user
 *             > Path : 
 *                     - id (required) : the hero's id
 *     - res (required) : instance of server response => where the controller sends all the answers
 * Returns : 1 if it went back, 0 if there was an error
 * */
export const deleteHeroByIdController = async (req, res) => {
    try {
        const id =parseInt(req.params.id);
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


/* Description: create a new hero
 * Arguments: 
 *     - req (required) : http request
 *             > Header : 
 *                     - auth (required) : the jwt token of the user
 *             > Body : 
 *                     - hero (required) : the new hero's information
 *     - res (required) : instance of server response => where the controller sends all the answers
 * Returns : 1 if it went back, 0 if there was an error
 * */
export const modifyHeroByIdController = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
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
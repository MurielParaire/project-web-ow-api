import {postVerifyUserService, getUserHistoryService, addRoleToUserByUserIdService, deleteRoleFromUserByUserIdService, modifyUserByIdService, deleteUserByIdService, getSomeUsersService, getAllUsersService, getUserInfoService, postUserHistoryService, createUserService} from '../services/userService.js'
import { getJWT } from './token.js';


/* Description: returns all (or a limited number of) the users
 * Arguments: 
 *     - req (required) : http request
 *             > Query : 
 *                     - limit (optional) : maximum number of user's returned
 *                     - offset (optional) : index of where to start / offset for collecting the user
 *     - res (required) : instance of server response => where the controller sends all the answers
 * Returns : a list of all the user
 * */
export const getAllUsersController = async (req, res) => {
    try {
        let jwt = req.header('auth');
        jwt = getJWT(jwt)
        if (jwt.status === 401) {
            res.status(401).json(jwt)
            return 0;
        }
        let results = 0;
        if ('limit' in req.query && 'offset' in req.query) {
            results = await getSomeUsersService(req.query.limit, req.query.offset, jwt);
        }
        else {
            results = await getAllUsersService(jwt);
        }
        res.status(200).json(results);
    }
    catch (err) {
        res.status(500);
        console.log(err);
    }
}


/* Description: returns the information of the authenticated user
 * Arguments: 
 *     - req (required) : http request
 *             > Header : 
 *                     - auth (required) : the jwt token of the user
 *     - res (required) : instance of server response => where the controller sends all the answers
 * Returns : the information of the user
 * */
export const getUserInfoController = async (req, res) => {
    try {
        let jwt = req.header('auth');
        jwt = getJWT(jwt)
        if (jwt.status === 401) {
            res.status(401).json(jwt)
            return 0;
        }
        let results = await getUserInfoService(jwt);
        res.status(200).json(results);
    }
    catch (err) {
        res.status(500);
        console.log(err);
    }
}


/* Description: verifies the user username and password
 * Arguments: 
 *     - req (required) : http request
 *             > Body : 
 *                     - user (required) : object containing username and password
 *     - res (required) : instance of server response => where the controller sends all the answers
 * Returns : a valid JWT token for the user
 * */
export const postVerifyUserController = async (req, res) => {
    try {
        
        const body = req.body;
        let results = await postVerifyUserService(body.username, body.password);
        res.status(200).json(results);
    }
    catch (err) {
        res.status(500);
        console.log(err);
    }
}


/* Description: returns the history of the authenticated user
 * Arguments: 
 *     - req (required) : http request
 *             > Header : 
 *                     - auth (required) : the jwt token of the user
 *     - res (required) : instance of server response => where the controller sends all the answers
 * Returns : a list of the history of the user
 * */
export const getUserHistoryController = async (req, res) => {
    try {
        let jwt = req.header('auth');
        jwt = getJWT(jwt)
        if (jwt.status === 401) {
            res.status(401).json(jwt)
            return 0;
        }
        let limit = parseInt(req.query.limit);
        let offset = parseInt(req.query.offset);
        let results = await getUserHistoryService(jwt, limit, offset);
        res.status(200).json(results);
    }
    catch (err) {
        res.status(500);
        console.log(err);
    }
}


/* Description: creates a new history for the authenticated user
 * Arguments: 
 *     - req (required) : http request
 *             > Header : 
 *                     - auth (required) : the jwt token of the user
 *             > Body : 
 *                     - history (required) : the history to create
 *     - res (required) : instance of server response => where the controller sends all the answers
 * Returns : 1 if it went back, 0 if there was an error 
 * */
export const postUserHistoryController = async (req, res) => {
    try {
        let jwt = req.header('auth');
        jwt = getJWT(jwt)
        if (jwt.status === 401) {
            res.status(401).json(jwt)
            return 0;
        }
        let id = jwt.userId;
        if (id === 0) {
            return 0
        }
        const history = req.body;
        let results = await postUserHistoryService(id, history);
        res.status(200).json(results);
    }
    catch (err) {
        res.status(500);
        console.log(err);
    }
}


/* Description: create a new user
 * Arguments: 
 *     - req (required) : http request
 *             > Body : 
 *                     - user (required) : the new user's information
 *     - res (required) : instance of server response => where the controller sends all the answers
 * Returns : 1 if it went back, 0 if there was an error
 * */
export const createUserController = async (req, res) => {
    try {
        let user = req.body;
        let results = await createUserService(user);
        if (results === 0) {
            res.status(401).json(results);
        }
        else {
            res.status(200).json(results);
        }
    }
    catch (err) {
        res.status(500);
        console.log(err);
    }
}


/* Description: delete a user
 * Arguments: 
 *     - req (required) : http request
 *             > Header : 
 *                     - auth (required) : the jwt token of the user
 *             > Path : 
 *                     - id (required) : the user's is
 *     - res (required) : instance of server response => where the controller sends all the answers
 * Returns : 1 if it went back, 0 if there was an error
 * */
export const deleteUserByIdController = async (req, res) => {
    try {
        const id = req.params.id;
        let jwt = req.header('auth');
        jwt = getJWT(jwt)
        if (jwt.status === 401) {
            res.status(401).json(jwt)
            return 0;
        }
        let results = await deleteUserByIdService(jwt, id);
        res.status(200).json(results);
    }
    catch (err) {
        res.status(500);
        console.log(err);
    }
}


/* Description: modify authenticated user's information
 * Arguments: 
 *     - req (required) : http request
 *             > Header : 
 *                     - auth (required) : the jwt token of the user
 *             > Path : 
 *                     - id (required) : the user's id
 *     - res (required) : instance of server response => where the controller sends all the answers
 * Returns : 1 if it went back, 0 if there was an error
 * */
export const modifyUserByIdController = async (req, res) => {
    try {
        const id = req.params.id;
        let jwt = req.header('auth');
        jwt = getJWT(jwt)
        if (jwt.status === 401) {
            res.status(401).json(jwt)
            return 0;
        }
        let user = req.body;
        if (user.user_id.toString() !== id.toString()) {
            return {msg: 'You are not allowed to modify any user other than yourself'};
        }
        let results = await modifyUserByIdService(user);
        res.status(200).json(results);
    }
    catch (err) {
        res.status(500);
        console.log(err);
    }
}


/* Description: remove a role from a user
 * Arguments: 
 *     - req (required) : http request
 *             > Header : 
 *                     - auth (required) : the jwt token of the user
 *             > Path : 
 *                     - id (required) : the role's id
 *             > Query : 
 *                     - role (required) : the role to remove
 *     - res (required) : instance of server response => where the controller sends all the answers
 * Returns : 1 if it went back, 0 if there was an error
 * */
export const deleteRoleFromUserByUserIdController = async (req, res) => {
    try {
        const id = req.params.id;
        const role = req.query.role;
        let jwt = req.header('auth');
        jwt = getJWT(jwt)
        if (jwt.status === 401) {
            res.status(401).json(jwt)
            return 0;
        }
        let results = await deleteRoleFromUserByUserIdService(jwt, id, role);
        res.status(200).json(results);
    }
    catch (err) {
        res.status(500);
        console.log(err);
    }
}


/* Description: add a role to a user
 * Arguments: 
 *     - req (required) : http request
 *             > Header : 
 *                     - auth (required) : the jwt token of the user
 *             > Path : 
 *                     - id (required) : the user's id
 *             > Query : 
 *                     - role (required) : the role to add
 *     - res (required) : instance of server response => where the controller sends all the answers
 * Returns : 1 if it went back, 0 if there was an error
 * */
export const addRoleToUserByUserIdController = async (req, res) => {
    try {
        const id = req.params.id;
        const role = req.query.role;
        let jwt = req.header('auth');
        jwt = getJWT(jwt)
        if (jwt.status === 401) {
            res.status(401).json(jwt)
            return 0;
        }
        let results = await addRoleToUserByUserIdService(jwt, id, role);
        res.status(200).json(results);
    }
    catch (err) {
        res.status(500);
        console.log(err);
    }
}
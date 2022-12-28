import {postVerifyUserService, deleteUserByIdService, getSomeUsersService, getAllUsersService, getUserInfoService, postUserHistoryService, createUserService} from '../services/userService.js'
import Jwt from 'jsonwebtoken';


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

export const getUserInfoController = async (req, res) => {
    try {
        let jwt = req.header('authorization');
        jwt = jwt.replace('"', '');
        jwt = jwt.replace('"', '');
        jwt = Jwt.verify(jwt, 'secret');
        let results = await getUserInfoService(jwt);
        res.status(200).json(results);
    }
    catch (err) {
        res.status(500);
        console.log(err);
    }
}


export const postUserHistoryController = async (req, res) => {
    try {
        let jwt = req.header('authorization');
        jwt = jwt.replace('"', '');
        jwt = jwt.replace('"', '');
        jwt = Jwt.verify(jwt, 'secret');
        let id = jwt.user_id;
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


export const getAllUsersController = async (req, res) => {
    try {
        let jwt = req.header('authorization');
        jwt = jwt.replace('"', '');
        jwt = jwt.replace('"', '');
        jwt = Jwt.verify(jwt, 'secret');
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
            console.log(req.headers['limit'])
            console.log(req.headers['offset'])
            results = await getSomeUsersService(req.header('limit'), req.header('offset'), jwt);
        }
        else {
            results = await getAllUsersService();
        }
        res.status(200).json(results);
    }
    catch (err) {
        res.status(500);
        console.log(err);
    }
}


export const deleteUserByIdController = async (req, res) => {
    try {
        const id = req.params.id;
        let jwt = req.header('authorization');
        jwt = jwt.replace('"', '');
        jwt = jwt.replace('"', '');
        jwt = Jwt.verify(jwt, 'secret');
        let results = await deleteUserByIdService(jwt, id);
        res.status(200).json(results);
    }
    catch (err) {
        res.status(500);
        console.log(err);
    }
}
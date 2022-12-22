import {postVerifyUserService, getUserByTokenService, postUserHistoryService, createUserService} from '../services/userService.js'

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

export const getUserByTokenController = async (req, res) => {
    try {
        let token = req.header('authorization');
        token = token.replace('"', '');
        token = token.replace('"', '');
        let results = await getUserByTokenService(token);
        res.status(200).json(results);
    }
    catch (err) {
        res.status(500);
        console.log(err);
    }
}


export const postUserHistoryController = async (req, res) => {
    try {
        let token = req.header('authorization');
        token = token.replace('"', '');
        token = token.replace('"', '');
        const history = req.body;
        let results = await postUserHistoryService(token, history);
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
        res.status(200).json(results);
    }
    catch (err) {
        res.status(500);
        console.log(err);
    }
}
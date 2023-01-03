import Jwt from 'jsonwebtoken';


export function getJWT(jwt) {
    try {
        jwt = jwt.replace('"', '');
        jwt = jwt.replace('"', '');
        jwt = Jwt.verify(jwt, 'secret');
        jwt.status = 200;
        return jwt;
    }
    catch (err) {
        return {status: 401, msg: 'Your connection has expired. Please reconnect to the website.'}
    }
}
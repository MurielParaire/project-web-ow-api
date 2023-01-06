import Jwt from 'jsonwebtoken';


/* Description: verifies if the jwt token is valid
 * Arguments: 
 *     - jwt : the json web token of the user
 * Returns : 
 *     - user verified & token valid : returns token content + status 200
 *     - user error : returns status 401 and an error message
 * */
export function getJWT(jwt) {
    try {
        jwt = jwt.replace('"', '');
        jwt = jwt.replace('"', '');
        jwt = Jwt.verify(jwt, process.env.JWT_SECRET_KEY);
        jwt.status = 200;
        return jwt;
    }
    catch (err) {
        return {status: 401, msg: 'Your connection has expired. Please reconnect to the website.'}
    }
}
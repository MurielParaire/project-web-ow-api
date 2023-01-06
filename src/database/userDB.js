import { admin_pool } from './connection_details/connection_admin.js'


/* Description: get all users
 * Returns : the list of users or an error message in case an error is thrown
 * */
export async function getAllUsersDB() {
    try {
        let results = await admin_pool.query('select username, firstname, lastname, email from ow_user order by user_id ;', []);
        if (results.rowCount > 0) {
            return results.rows;
        }
        return 0;
        
    }
    catch (err) {
        console.log(err);
        return {msg: 'Sorry but there was a problem.'};
    }
}

/* Description: get a list of some users
 * Arguments: 
 *     - limit (required) : the maximal number of users to return
 *     - offset (required) : the offset to get the users 
 * Returns : a list of some users or an error message in case an error is thrown
 * */
export async function getSomeUsersDB(limit, offset) {
    try {
        let results = await admin_pool.query('select user_id from ow_user order by user_id offset ($1) limit($2) ;', [offset, limit]);
        if (results.rowCount > 0) {
            return results.rows;
        }
        return 0;
        
    }
    catch (err) {
        console.log(err);
        return {msg: 'Sorry but there was a problem.'};
    }
}


/* Description: gets the information of a user thanks to his username
 * Arguments: 
 *     - username (required) : the user's username
 * Returns : the user id or an error message if there was an error
 * */
export async function getUserByUsernameDB(username) {
    try {
        let results = await admin_pool.query('SELECT user_id FROM ow_user WHERE ow_user.username = $1 ;', [username]);
        if (results.rowCount > 0) {
            return results.rows;
        }
        return 0;
    }
    catch (err) {
        console.log(err);
        return {msg: 'Sorry but there was a problem.'};
    }
}


/* Description: gets the password of a user by his id
 * Arguments: 
 *     - id (required) : the user's id
 * Returns : the user's password or an error message if there was an error
 * */
export async function getPasswordFromUserDB(id) {
    try {
        let results = await admin_pool.query('SELECT password FROM ow_user WHERE user_id = $1 ;', [id]);
        if (results.rows.length > 0) {
            return results.rows[0].password;
        }
        return 0;
    }
    catch (err) {
        console.log(err);
        return {msg: 'Sorry but there was a problem.'};
    }
}


/* Description: gets the combat history of a user by his id
 * Arguments: 
 *     - id (required) : the user's id
 *     - limit (required) : the maximal number of history elements to return
 *     - offset (required) : the offset to get the history 
 * Returns : the user's history or an error message if there was an error
 * */
export async function getUserHistoryByIdDB(id, limit, offset) {
    try {
        let results = await admin_pool.query('SELECT team_a, team_b, winner, date_time FROM history WHERE id_user = $1 LIMIT $2 OFFSET $3 ;', [id, limit, offset]);
        if (results.rows.length > 0) {
            return results.rows;
        }
        return 0;
    }
    catch (err) {
        console.log(err);
        return {msg: 'Sorry but there was a problem.'};
    }
}


/* Description: gets the user's information by his id
 * Arguments: 
 *     - id (required) : the user's id
 * Returns : the user's information or an error message if there was an error
 * */
export async function getUserByIdDB(id) {
    try {
        let results = await admin_pool.query('SELECT user_id, username, firstname, lastname, email FROM ow_user WHERE ow_user.user_id = $1;', [id]);
        if (results.rowCount === 0) {
            return 0;
        }
        let user = results.rows[0];
        user.roles = await getUserRolesByIdDB(id);
        return user;
    }
    catch (err) {
        console.log(err);
        return {msg: 'Sorry but there was a problem.'};
    }
}


/* Description: gets the roles of a user by his id
 * Arguments: 
 *     - id (required) : the user's id
 * Returns : the user's roles or an error message if there was an error
 * */
export async function getUserRolesByIdDB(id) {
    try {
        let results = await admin_pool.query('select role from ow_user join user_role on ow_user.user_id = user_role.id_user join role on user_role.id_role = role.id where ow_user.user_id = $1 ;', [id]);
        if (results.rowCount > 0) {
            return results.rows;
        }
        return 0;
        
    }
    catch (err) {
        console.log(err);
        return {msg: 'Sorry but there was a problem.'};
    }
}


/* Description: creates a new history entry for a specified user
 * Arguments: 
 *     - id (required) : the user's id
 *     - history (required) : the history to insert
 * Returns : 1 if it went back or an error message if there was an error
 * */
export async function postUserHistoryDB(id, history) {
    try {
        let results = await admin_pool.query('INSERT INTO history (team_a, team_b, winner, date_time, id_user) VALUES ($1, $2, $3, $4, $5) ;', [history.team_a, history.team_b, history.winner, history.date_time, id]);
        if (results.rowCount > 0) {
            return 1;
        }
        return 0;
    }
    catch (err) {
        console.log(err);
        return {msg: 'Sorry but there was a problem.'};
    }
}


/* Description: create a new user
 * Arguments: 
 *     - user (required) : the user to create
 * Returns : 1 if it worked or an error message in case an error is thrown
 * */
export async function createUserDB(user) {
    try {
        console.log('user')
        console.log(user)
        let results = await admin_pool.query('INSERT INTO ow_user (username, firstname, lastname, email, password) VALUES ($1, $2, $3, $4, $5) ;', [user.username, user.firstname, user.lastname, user.email, user.password]);
        console.log(results)
        if (results.rowCount > 0) {
            return res.rowCount;
        }
        return 0;

    }
    catch (err) {
        console.log(err);
        return {msg: 'Sorry but there was a problem.'};
    }
}


/* Description: gets the user's id by his username
 * Arguments: 
 *     - user (required) : the user's username
 * Returns : the user's id or an error message if there was an error
 * */
export async function getUserIdByUsername(user) {
    try {
        let results = await admin_pool.query('SELECT user_id FROM ow_user WHERE username = $1 ;', [user]);
        if (results.rowCount > 0) {
            return results.rows[0].user_id;
        }
        return 0;

    }
    catch (err) {
        console.log(err);
        return {msg: 'Sorry but there was a problem.'};
    }
}


/* Description: counts all the existing users
 * Returns : the number of registered users or an error message if there was an error
 * */
export async function getCountUserDB() {
    try {
        let results = await admin_pool.query('select count(user_id) from ow_user;', []);
        if (results.rowCount > 0) {
            return results.rows[0].count;
        }
        return 0;
        
    }
    catch (err) {
        console.log(err);
        return {msg: 'Sorry but there was a problem.'};
    }
}


/* Description: delete a user by his id
 * Arguments: 
 *     - id (required) : the user's id
 * Returns : 1 if it worked, 0 if it didn't or an error message if there was an error
 * */
export async function deleteUserByIdDB(id) {
    try {
        let results = await admin_pool.query('delete from ow_user where user_id=$1;', [id]);
        return results.rowCount;
    }
    catch (err) {
        console.log(err);
        return {msg: 'Sorry but there was a problem.'};
    }
}


/* Description: modify a user
 * Arguments: 
 *     - user (required) : the user's information and id
 * Returns : 1 if it worked, 0 if it didn't or an error message if there was an error
 * */
export async function modifyUserByIdDB(user) {
    try {
        let results = await admin_pool.query('update ow_user set username=$1, firstname=$2, lastname=$3, email=$4 where user_id=$5', [user.username, user.firstname, user.lastname, user.email, user.user_id]);
        return results.rowCount;
    }
    catch (err) {
        console.log(err);
        return {msg: 'Sorry but there was a problem.'};
    }
}


/* Description: delete a role from a user by
 * Arguments: 
 *     - id (required) : the user's id
 *     - role (required) : the role's id
 * Returns : 1 if it worked, 0 if it didn't or an error message if there was an error
 * */
export async function deleteRoleFromUserByUserIdDB(id, role) {
    try {
        let results = await admin_pool.query('delete from user_role where id_user=$1 and id_role = $2;', [id,role]);
        return results.rowCount;
    }
    catch (err) {
        console.log(err);
        return {msg: 'Sorry but there was a problem.'};
    }
}


/* Description: get the id of a role by its role name
 * Arguments: 
 *     - role (required) : the role's name
 * Returns : the role's id or an error message if there was an error
 * */
export async function getRoleIdFromRoleDB(role) {
    try {
        let results = await admin_pool.query('select id from role where role=$1;', [role]);
        if (results.rowCount === 0) {
            return {msg: 'no role with that name found'};
        }
        return results.rows[0];
    }
    catch (err) {
        console.log(err);
        return {msg: 'Sorry but there was a problem.'};
    }
}


/* Description: add a role from a user by
 * Arguments: 
 *     - id (required) : the user's id
 *     - role (required) : the role's id
 * Returns : 1 if it worked, 0 if it didn't or an error message if there was an error
 * */
export async function addRoleToUserByUserIdDB(id, role) {
    try {
        let results = await admin_pool.query('insert into user_role (id_role, id_user) values ($1,$2)', [role, id]);
        return results.rowCount;
    }
    catch (err) {
        console.log(err);
        return {msg: 'Sorry but there was a problem.'};
    }
}
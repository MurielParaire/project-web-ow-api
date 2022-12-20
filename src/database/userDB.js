import { basic_admin_pool } from './connection_details/connection_admin.js'

export async function postVerifyUserDB() {
    try {
        let results = await basic_admin_pool.query('select * from event;');
        return results.rows;
    }
    catch (err) {
        console.log(err);
        return 0;
    }
}


export async function getUserByUsernameDB(username) {
    try {
        let results = await basic_admin_pool.query('SELECT user_id FROM ow_user WHERE ow_user.username = $1 ;', [username]);
        if (results.rowCount > 0) {
            return results.rows;
        }
        return 0;
    }
    catch (err) {
        console.log(err);
        return 0;
    }
}

export async function getPasswordFromUserDB(id) {
    try {
        let results = await basic_admin_pool.query('SELECT password FROM ow_user WHERE user_id = $1 ;', [id]);
        if (results.rows.length > 0) {
            return results.rows[0].password;
        }
        return 0;
    }
    catch (err) {
        console.log(err);
        return 0;
    }
}

export async function createHashUserDB(id, hash) {
    try {
        let results = await basic_admin_pool.query('INSERT INTO user_hash (user_id, hash) VALUES ($1, $2);', [id, hash]);
        if (results.rowCount === 0) {
            return 0;
        }
    }
    catch (err) {
        console.log(err);
        return 0;
    }
}




export async function getUserHistoryByIdDB(id, limit, offset) {
    try {
        let results = await basic_admin_pool.query('SELECT team_a, team_b, winner, date_time FROM history WHERE id_user = $1 LIMIT $2 OFFSET $3;', [id, limit, offset]);
        if (results.rows.length > 0) {
            return results.rows;
        }
        return 0;
    }
    catch (err) {
        console.log(err);
        return 0;
    }
}


export async function getUserIdByTokenDB(token) {
    try {
        let results = await basic_admin_pool.query('SELECT user_id FROM user_hash WHERE hash = $1;', [token]);
        if (results.rows.length > 0) {
            return results.rows[0].user_id;
        }
        return 0;
    }
    catch (err) {
        console.log(err);
        return 0;
    }
}

export async function getUserByIdDB(id) {
    try {
        let results = await basic_admin_pool.query('SELECT username, firstname, lastname, email FROM ow_user WHERE ow_user.user_id = $1;', [id]);
        if (results.rowCount === 0) {
            return 0;
        }
        let user = results.rows[0];
        user.roles = await getUserRolesByIdDB(id);
        console.log(user)
        return user;
    }
    catch (err) {
        console.log(err);
        return 0;
    }
}

export async function getUserRolesByIdDB(id) {
    try {
        let results = await basic_admin_pool.query('select role from ow_user join user_role on ow_user.user_id = user_role.id_user join role on user_role.id_role = role.id where ow_user.user_id = $1 ;', [id]);
        if (results.rowCount > 0) {
            return results.rows;
        }
        return 0;
        
    }
    catch (err) {
        console.log(err);
        return 0;
    }
}


export async function postUserHistoryDB(id, history) {
    try {
        let results = await basic_admin_pool.query('INSERT INTO history (team_a, team_b, winner, date_time, id_user) VALUES ($1, $2, $3, $4, $5) ;', [history.team_a, history.team_b, history.winner, history.date_time, id]);
        console.log(results)
        if (results.rowCount > 0) {
            return 1;
        }
        return 0;
    }
    catch (err) {
        console.log(err);
        return 0;
    }
}
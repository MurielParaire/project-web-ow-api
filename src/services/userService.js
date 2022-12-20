import { getUserByUsernameDB, postUserHistoryDB, getUserIdByTokenDB, getUserHistoryByIdDB, getPasswordFromUserDB, createHashUserDB, getUserByIdDB } from '../database/userDB.js'
import bcrypt from 'bcrypt'

const rounds = 10;

function getHash(password) {
  return bcrypt.hash(password, rounds);
}

export async function postVerifyUserService(username, password) {
  let result = await getUserByUsernameDB(username);
  if (result[0].user_id === 0) {
    return 0;
  }
  let querypw = await getPasswordFromUserDB(result[0].user_id);
  let verify = await bcrypt.compare((password).toString(), querypw);
  if (verify === false) {
    return 0;
  }
  let hash = await getHash((password).toString());
  while (hash.includes('/')) {
    hash = await getHash((password).toString());
  }
  await createHashUserDB(result[0].user_id, hash);
  return hash;
}



export async function getUserByTokenService(token) {
  let id = await getUserIdByTokenDB(token);
  if (id === 0) {
    return 0;
  }
  let result = await getUserByIdDB(id);
  let Userrole = [];
  if (result.roles.length > 0) {
    if (result.roles.length > 1) {
      (result.roles).forEach(role => {
        if (getRole(role.role) > Userrole) {
          Userrole.push(getRole(role.role));
        }
      });
      return Userrole
    }
    Userrole.push(getRole(result.roles[0].role))
    result.roles = Userrole
    result.history = await getUserHistoryByIdDB(id, 10, 0);
    return result;
  }
}


export async function postUserHistoryService(token, history) {
  let id = await getUserIdByTokenDB(token);
  if (id === 0) {
    return 0;
  }
  let result = await postUserHistoryDB(id, history);
  return result;
}


function getRole(role) {
  if (role === 'public') {
    return 1;
  }
  if (role === 'admin') {
    return 2;
  }
  if (role === 'supervisor') {
    return 3;
  }
  if (role === 'manager') {
    return 4;
  }
  return 0;
}
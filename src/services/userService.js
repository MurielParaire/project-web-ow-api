import { getUserByUsernameDB, postUserHistoryDB, getUserIdByTokenDB, getUserHistoryByIdDB, getPasswordFromUserDB, createHashUserDB, getUserByIdDB, createUserDB } from '../database/userDB.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const saltRounds = 10;

async function getHash(password) {
  let salt = await bcrypt.genSalt(saltRounds);
  let hash = await bcrypt.hash(password, salt)
  console.log('Hash: ', hash)
  return hash;
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
  
  let data = {
      time: Date(),
      userId: result[0].user_id,
  }
  /*algorithm: "ES256" */
  const token = jwt.sign(data, process.env.JWT_SECRET_KEY, { expiresIn: '6400s' });
  console.log('token')
  console.log(token)
  await createHashUserDB(result[0].user_id, token);
  return token;
}



export async function getUserByTokenService(token) {
  let id = await getUserIdByTokenDB(token);
  if (id === 0) {
    return 0;
  }
  let result = await getUserByIdDB(id);
  console.log('k')
  console.log(result)
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
    console.log(result)
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

export async function createUserService(user) {
  user.password = await getHash(user.password);
  let result = await createUserDB(user);
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
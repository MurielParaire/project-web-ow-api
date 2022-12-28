import { getUserByUsernameDB, modifyUserByIdDB, deleteUserByIdDB, getSomeUsersDB, getAllUsersDB, postUserHistoryDB, getCountUserDB, getUserHistoryByIdDB, getPasswordFromUserDB, getUserByIdDB, createUserDB } from '../database/userDB.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const saltRounds = 10;

async function getHash(password) {
  let salt = await bcrypt.genSalt(saltRounds);
  let hash = await bcrypt.hash(password, salt)
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
  const token = jwt.sign(data, 'secret', { expiresIn: '6400s' }, process.env.JWT_SECRET_KEY);
  return token;
}



export async function getUserInfoService(token) {
  let id = token.userId;
  if (id === 0) {
    return 0;
  }
  let result = await getUserByIdDB(id);
  result.roles = getRoles(result.roles)
  result.history = await getUserHistoryByIdDB(id, 10, 0);
  return result;
}


export async function postUserHistoryService(id, history) {
  let result = await postUserHistoryDB(id, history);
  return result;
}

export async function createUserService(user) {
  user.password = await getHash(user.password);
  let countUser = await getCountUserDB();
  if (countUser >= 10) {
    return 0;
  }
  let result = await createUserDB(user);
  return result;
}

export async function getAllUsersService(token) {
  let id = token.userId;
  if (id === 0) {
    return 0;
  }
  let user = await getUserByIdDB(id);
  user.roles = getRoles(user.roles)
  if (user.roles.admin === true) {
    let result = await getAllUsersDB();
    return result;
  }
  return 0;
}


export async function getSomeUsersService(limit, offset, token) {
  let id = token.userId;
  if (id === 0) {
    return 0;
  }
  let user = await getUserByIdDB(id);
  user.roles = getRoles(user.roles)
  if (user.roles.admin === true) {
    let result = await getSomeUsersDB(limit, offset);
    return result;
  }
  return 0;
}


export function getRoles(rolelist) {
  let roles = {
    public: true,
    admin: false,
    supervisor: false,
    manager: false
  }
  for (let counter = 0; counter < rolelist.length; counter++) {
    if (rolelist[counter].role === 'admin') {
      roles.admin = true;
      roles.supervisor = true;
      roles.manager = true;
      return roles;
    }
    if (rolelist[counter].role === 'supervisor') {
      roles.supervisor = true;
    }
    if (rolelist[counter].role === 'manager') {
      roles.manager = true;
    }
  }
  return roles;
}


export async function deleteUserByIdService(jwt, id) {
  let user = await getUserByIdDB(jwt.userId);
  user.roles = getRoles(user.roles);
  let result = 0;
  if (user.roles.admin === true) {
      let deluser = await getUserByIdDB(id);
      deluser.roles = getRoles(deluser.roles);
      if (deluser.roles.admin === true) {
        return {msg: 'You are not allowed to delete an admin user'}
      }
      result = await deleteUserByIdDB(id);
  }
  return result;
}


export async function modifyUserByIdService(user) {
  let result = await modifyUserByIdDB(user);
  return result;
}
import { getUserByUsernameDB, getRoleIdFromRoleDB, addRoleToUserByUserIdDB, deleteRoleFromUserByUserIdDB, modifyUserByIdDB, deleteUserByIdDB, getSomeUsersDB, getAllUsersDB, postUserHistoryDB, getCountUserDB, getUserHistoryByIdDB, getPasswordFromUserDB, getUserByIdDB, createUserDB } from '../database/userDB.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

//the number of rounds to encypt the password
const saltRounds = 10;

/* Description: encrypt the password of the user
 * Arguments: 
 *     - password (required) : the password of the user
 * Returns : the encrypted password
 * */
async function getHash(password) {
  let salt = await bcrypt.genSalt(saltRounds);
  let hash = await bcrypt.hash(password, salt)
  return hash;
}


/* Description: verify the user
 * Arguments: 
 *     - password (required) : the password of the user
 *     - username (required) : the username of the user
 * Returns : the encrypted password
 * */
export async function postVerifyUserService(username, password) {
  //get the id of the user with this username
  
  let user = await getUserByUsernameDB(username);
  if (user[0].user_id === 0) {
    return 0;
  }
  //If the id is valid, then we verify the entered password
  let querypw = await getPasswordFromUserDB(user[0].user_id);
  let verify = await bcrypt.compare((password).toString(), querypw);
  if (verify === false) {
    return 0;
  }

  //create the token
  let data = {
    time: Date(),
    userId: user[0].user_id,
  }
  //the token expires after 4h automatically
  const token = jwt.sign(data, process.env.JWT_PUBLIC_KEY, { expiresIn: '4h' }, process.env.JWT_SECRET_KEY);
  return token;
}


/* Description: gets the users' own information
 * Arguments: 
 *     - token (required) : the resolved jwt token of the user containing his id
 * Returns : the users' information
 * */
export async function getUserInfoService(token) {
  let id = token.userId;
  if (id === 0) {
    return 0;
  }
  let result = await getUserByIdDB(id);
  result.roles = getRoles(result.roles)
  return result;
}


/* Description: gets the users' own information
 * Arguments: 
 *     - token (required) : the resolved jwt token of the user containing his id
 *     - limit (required) : the maximal number of history entries to return
 *     - offset (required) : the offset to get the history entries 
 * Returns : a list of the users' history entries or 0 if the user Id is 0
 * */
export async function getUserHistoryService(token, limit, offset) {
  let id = token.userId;
  if (id === 0) {
    return 0;
  }
  let result = await getUserHistoryByIdDB(id, limit, offset);
  return result;
}


/* Description: create a new history entry for the user
 * Arguments: 
 *     - id (required) : the users' id
 *     - history (required) : the value of the history entry to insert
 * Returns : the result of the postUserHistoryDB (1 if it worked)
 * */
export async function postUserHistoryService(id, history) {
  let result = await postUserHistoryDB(id, history);
  return result;
}


/* Description: create a new user
 * Arguments: 
 *     - user (required) : the new users' information
 * Returns : the result of the createUserDB (1 if it worked)
 * */
export async function createUserService(user) {
  user.password = await getHash(user.password);
  //since this project only works on my server, I stopped the maximal amount of users at 10. 
  //If we would scale it, this verification would be removed
  let countUser = await getCountUserDB();
  if (countUser >= 10) {
    return {msg: 'Sorry but there are already to many registered users.'};
  }
  let result = await createUserDB(user);
  return result;
}


/* Description: gets all users
 * Arguments: 
 *     - token (required) : the resolved jwt token of the user containing his id
 * Returns : the result of getAllUsersDB (a list of the users)
 * */
export async function getAllUsersService(token) {
  let id = token.userId;
  if (id === 0) {
    return 0;
  }
  //make sure the user has the role admin and is therefore allowed to see all user
  let user = await getUserByIdDB(id);
  user.roles = getRoles(user.roles)
  if (user.roles.admin === true) {
    let result = await getAllUsersDB();
    return result;
  }
  return 0;
}


/* Description: gets some of the users
 * Arguments: 
 *     - token (required) : the resolved jwt token of the user containing his id
 *     - limit (required) : the maximal number of users to return
 *     - offset (required) : the offset to get the users 
 * Returns : a list of the users or 0 if the user Id is 0
 * */
export async function getSomeUsersService(limit, offset, token) {
  let id = token.userId;
  if (id === 0) {
    return 0;
  }
  //make sure the user has the role admin and is therefore allowed to see all user
  let user = await getUserByIdDB(id);
  user.roles = getRoles(user.roles)
  if (user.roles.admin === true) {
    let result = await getSomeUsersDB(limit, offset);
    for (let count = 0; count < result.length; count++) {
      let user = await getUserByIdDB(result[count].user_id);
      user.roles = getRoles(user.roles)
      result[count] = user;
    }
    return result;;
  }
  return 0;
}


/* Description: gets the roles of a user
 * Arguments: 
 *     - rolelist (required) : a list of all roles the user has
 * Returns : an object with the roles of the user
 * */
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


/* Description: delete a user
 * Arguments: 
 *     - jwt (required) : the resolved jwt token of the user containing his id
 *     - id (required) : the id of the user
 * Returns : 1 if it worked, 0 if it didn't or an error message in case an error is thrown
 * */ 
export async function deleteUserByIdService(jwt, id) {
  //make sure the user has the role admin and is therefore allowed to delete any user
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


/* Description: lets the user modify their own information
 * Arguments: 
 *     - user (required) : the modified information of the user
 * Returns : 1 if it worked, 0 if it didn't or an error message in case an error is thrown
 * */
export async function modifyUserByIdService(user) {
  let result = await modifyUserByIdDB(user);
  return result;
}


/* Description: remove a role from a user
 * Arguments: 
 *     - role (required) : the name of the role to be removed
 *     - jwt (required) : the resolved jwt token of the user containing his id
 *     - id (required) : the id of the user of whom the role will be removed
 * Returns : 1 if it worked, 0 if it didn't or an error message in case an error is thrown
 * */
export async function deleteRoleFromUserByUserIdService(jwt, id, role) {
  if (role !== 'admin' && role !== 'manager' && role !== 'supervisor') {
    return 0;
  }
  //make sure the user has the role admin and is therefore allowed to modify any user
  let user = await getUserByIdDB(jwt.userId);
  user.roles = getRoles(user.roles);
  let result = 0;
  if (user.roles.admin === true) {
      let deluser = await getUserByIdDB(id);
      deluser.roles = getRoles(deluser.roles);
      //Users are not allowed to change the roles of an admin user
      if (deluser.roles.admin === true) {
        return {msg: 'You are not allowed to delete the role of an admin user'}
      }
      let roleId = await getRoleIdFromRoleDB(role);
      result = await deleteRoleFromUserByUserIdDB(id, roleId.id);
  }
  return result;
}


/* Description: add a role to a user
 * Arguments: 
 *     - role (required) : the name of the role to be added
 *     - jwt (required) : the resolved jwt token of the user containing his id
 *     - id (required) : the id of the user to whom the role will be added
 * Returns : 1 if it worked, 0 if it didn't or an error message in case an error is thrown
 * */
export async function addRoleToUserByUserIdService(jwt, id, role) {
  if (role !== 'admin' && role !== 'manager' && role !== 'supervisor') {
    return 0;
  }
  //make sure the user has the role admin and is therefore allowed to modify any user
  let user = await getUserByIdDB(jwt.userId);
  user.roles = getRoles(user.roles);
  let result = 0;
  if (user.roles.admin === true) {
      let adduser = await getUserByIdDB(id);
      adduser.roles = getRoles(adduser.roles);
      //if the user already has the role there is no need to call the database for the insertion
      if (role === 'admin' && adduser.roles.admin === true || role === 'supervisor' && adduser.roles.supervisor === true || role === 'manager' && adduser.roles.manager === true) {
        return {msg: 'This user already has this role.'}
      }
      let roleId = await getRoleIdFromRoleDB(role);
      result = await addRoleToUserByUserIdDB(id, roleId.id);
  }
  return result;
}
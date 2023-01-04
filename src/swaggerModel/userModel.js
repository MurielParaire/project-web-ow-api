//data model for a user (GET/POST) and history : 

/**
 * @swagger
 * components:
 *   schemas:
 *     user:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         user_id:
 *           type: Integer
 *           description: The auto-generated id of the user.
 *         username:
 *           type: string
 *           description: The username of the user.
 *         firstname:
 *           type: string
 *           description: The firstname of the user.
 *         lastname:
 *           type: string
 *           description: The lastname of the user.
 *         email:
 *           type: string
 *           format: email
 *           description: The email of the user.
 *         password:
 *           type: string
 *           description: The password of the user.
 *       example:
 *         user_id: 2
 *         username: myUsername
 *         firstname: Angela
 *         lastname: Ziegler
 *         email: myemail@gmail.com
 *         password: ZDHZQBDZ34
 *     history:
 *       type: object
 *       required:
 *         - id_user
 *         - date_time
 *         - team_a
 *         - team_b
 *         - winner
 *       properties:
 *         id_user:
 *           type: Integer
 *           description: The id of the corresponding user.
 *         date_time:
 *           type: string
 *           format: date-time
 *           description: The date of the fight.
 *         team_a:
 *           type: string
 *           description: All the names of the characters in the first team.
 *         team_b:
 *           type: string
 *           description: All the names of the characters in the second team.
 *         winner:
 *           type: string
 *           description: The winning team. Has to be either 'A' or 'B'.
 *       example:
 *         id_user: 2
 *         date_time: 2022-12-14 20:55:45
 *         team_a: Kiriko Lucio Hanzo Bastion Doomfist
 *         team_b: Baptiste Lúcio Sojourn Cassidy D.Va
 *         winner: A
 *     userPost:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: The username of the user.
 *         firstname:
 *           type: string
 *           description: The firstname of the user.
 *         lastname:
 *           type: string
 *           description: The lastname of the user.
 *         email:
 *           type: string
 *           format: email
 *           description: The email of the user.
 *         password:
 *           type: string
 *           description: The password of the user.
 *       example:
 *         username: myUsername
 *         firstname: Angela
 *         lastname: Ziegler
 *         email: myemail@gmail.com
 *         password: ZDHZQBDZ34
 */

//some swagger options
//data model for a character : 
/**
 * @swagger
 * components:
 *   schemas:
 *     event:
 *       type: object
 *       required:
 *         - type
 *         - description
 *         - character
 *       properties:
 *         event_id:
 *           type: Integer
 *           description: The auto-generated id of the event.
 *         type:
 *           type: string
 *           description: The type of the event. Has to be either 'kill', 'help', 'heal', 'immobile', 'res, 'stun' or 'special'.
 *         description:
 *           type: string
 *           description: The description of the event.
 *         character:
 *           type: Integer
 *           description: The id of the character it is affiliated with.
 *           required: false
 *       example:
 *         event_id: 14
 *         type: kill
 *         description: $1 has killed $2.
 *         character: 20
 *     eventPost:
 *       type: object
 *       required:
 *         - type
 *         - description
 *         - character
 *       properties:
 *         type:
 *           type: string
 *           description: The type of the event. Has to be either 'kill', 'help', 'heal', 'immobile', 'res, 'stun' or 'special'.
 *         description:
 *           type: string
 *           description: The description of the event.
 *         character:
 *           type: Integer
 *           description: The id of the character it is affiliated with.
 *           required: false
 *       example:
 *         type: kill
 *         description: $1 has killed $2.
 *         character: 20
 */
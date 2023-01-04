//data model for a character/ hero (GET/POST) : 

/**
 * @swagger
 * components:
 *   schemas:
 *     character:
 *       type: object
 *       required:
 *         - name
 *         - role
 *         - description
 *         - image
 *       properties:
 *         id_char:
 *           type: Integer
 *           description: The auto-generated id of the character.
 *         name:
 *           type: string
 *           description: The name of the character.
 *         role:
 *           type: string
 *           description: The role of the character. Has to be either Tank, DPS or Support.
 *         description:
 *           type: string
 *           description: A description of the character.
 *         image:
 *           type: string
 *           description: The link to the image of the character.
 *       example:
 *         id_char: 20
 *         name: Tracer
 *         role: DPS
 *         description: The former Overwatch agent known as Tracer is a time-jumping adventurer and an irrepressible force for good.
 *         image: https://image.tracer.png
 *
 *     characterPost:
 *       type: object
 *       required:
 *         - name
 *         - role
 *         - description
 *         - image
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the character.
 *         role:
 *           type: string
 *           description: The role of the character. Has to be either Tank, DPS or Support.
 *         description:
 *           type: string
 *           description: A description of the character.
 *         image:
 *           type: string
 *           description: The link to the image of the character.
 *       example:
 *         name: Tracer
 *         role: DPS
 *         description: The former Overwatch agent known as Tracer is a time-jumping adventurer and an irrepressible force for good.
 *         image: https://image.tracer.png
 */
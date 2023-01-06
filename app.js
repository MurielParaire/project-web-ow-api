import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { router } from './src/router/router.js';
import dotenv from 'dotenv';
import swaggerJSDoc from 'swagger-jsdoc';
import SwaggerOptions from 'swagger-ui-express';

//the port on which our app runs
const port = 3000;

//creation of our express app
const api = express();

//configuration of dotenv so that we can read environmental variables in .env
dotenv.config();

//specifying who can and who can't access our application
api.use(cors({
    origin: '*'
}));


api.use(bodyParser.json());
api.use(
    bodyParser.urlencoded({
        extended: true
    })
);

//defining the router to use
api.use('/owapi', router);

//defining our documentation with Swagger
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "REST API for my university project about Overwatch2",
            version: "3.4.2",
            description:
                "This is a simple CRUD API application made with Express and documented with Swagger. \n" + 
                "This application serves as backend for my web application where I implemented a simple text-based combat system for Overwatch2.",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
        },
        servers: [
          {
            url: "http://162.38.112.158:3000/owapi",
          },
        ],
    },
    apis: ["src/swaggerModel/*.js", "src/router/*.js"],
};

//setting the url for our swagger documentation
const specs = swaggerJSDoc(options);
api.use(
    "/owapi/api-docs",
    SwaggerOptions.serve,
    SwaggerOptions.setup(specs, { explorer: true })
);

//running the api
api.listen(port, () => {
    console.log(`App running on port http://localhost:${port}/owapi. \n The documentation can be found on http://localhost:${port}/owapi/api-docs`)
});

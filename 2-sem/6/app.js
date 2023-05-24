//import handlers2 from './api2.js';
import handlers3 from './api3.js';
//import myRouter from './api.js';
import express from 'express';
import path from 'path';
import bodyParser from "body-parser";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from 'swagger-jsdoc';
import {authorizationApi, badURL, myHelmet, myMorgan, err, originHeaderMiddleware} from "./Middleware.js";

const app = express();

const port = 8000;
const host = '127.0.0.1';
const hosting = `http://${host}:${port}`;

const dirname = path.resolve();

app.use(myMorgan);

app.use(myHelmet);

app.use(bodyParser.json());

app.use(originHeaderMiddleware);

app.use(express.static(path.resolve(dirname, 'public')));

app.use('/api3', authorizationApi, handlers3);

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info:{
            title: "Documentations",
            version: "1.0.0",
            contact: {
                name: "KonininaAnastasia",
            },
        },
        servers: [
            {
                url: `/api3`
            },
        ],
        tags:[
            {
                name: "API",
                description: "create and delete apikey",
            },
            {
                name: "Models",
                description: "CRUD in models",
            },
            {
                name: "Comments",
                description: "CRUD in comments",
            },
            {
                name: "Home",
                description: "Home page",
            },
        ],
        host: "http://172.0.0.1:8000"
    },
    apis: ['documentations.yaml']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);


app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

//app.use('/api2', authorizationApi, handlers2);

//app.use('/api', authorizationApi, myRouter);//уровень маршрутизации

app.use(badURL);//уровень приложения

app.use(err);


app.listen(port, host, () => {
    console.log(`Server starting on ${hosting}`);
})

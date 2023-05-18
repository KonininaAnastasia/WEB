//import handlers2 from './api2.js';
import handlers3 from './api3.js';
//import myRouter from './api.js';
import express from 'express';
import path from 'path';
import bodyParser from "body-parser";
import {authorizationApi, badURL, myHelmet, myMorgan, err} from "./Middleware.js";

const app = express();

const port = 8000;
const host = '127.0.0.1';
const hosting = `http://${host}:${port}`;

const dirname = path.resolve();

app.use(myMorgan);

app.use(myHelmet);

app.use(bodyParser.json());

app.use(express.static(path.resolve(dirname, 'public')));

app.use('/api3', authorizationApi, handlers3);

//app.use('/api2', authorizationApi, handlers2);

//app.use('/api', authorizationApi, myRouter);//уровень маршрутизации

app.use(badURL);//уровень приложения

app.use(err);


app.listen(port, host, () => {
    console.log(`Server starting on ${hosting}`);
})

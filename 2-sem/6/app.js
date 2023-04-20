const myRouter = require("./api.js");
const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const { myMorgan, myHelmet, badURL, authorizationApi } = require("./Middleware.js");

const app = express();

const port = 8000;
const host = '127.0.0.1';
const hosting = `http://${host}:${port}`;

const dirname = path.resolve();

app.use(myMorgan);

app.use(myHelmet);

app.use(bodyParser.text());

app.use(express.static(path.resolve(dirname, 'public')));

app.use('/api/v1', authorizationApi, myRouter);//уровень маршрутизации

app.use(badURL);//уровень приложения

app.listen(port, host, () => {
    console.log(`Server starting on ${hosting}`);
})
const myRouter = require("./api.js");
const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");

const app = express();

const port = 8000;
const host = '127.0.0.1';
const hosting = `http://${host}:${port}`;

const dirname = path.resolve();

app.use(bodyParser.text());

app.use(express.static(path.resolve(dirname, 'public')));

app.use('/api/v1', myRouter);

app.listen(port, host, () => {
    console.log(`Server starting on ${hosting}`);
})
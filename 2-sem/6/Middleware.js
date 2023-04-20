const helmet = require('helmet');
const morgan = require('morgan');

const myHelmet = helmet();
const myMorgan = morgan('dev');

function validateInput(req, res, next){
    const userInput = req.body;
    const regex = /[@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
    const containsSpecialChars = regex.test(userInput);
    if (containsSpecialChars) return res.send(400, "Неправильные данные")
    next();
}

function authorizationApi(req, res, next){
    if (req.headers["api-key"]!== "nnnn") return res.send(400, "Неправильный ключ")
    next();
}

function badURL(req, res){
    res.status(400).send("Такой страницы не существует");
}

module.exports = {
    validateInput,
    authorizationApi,
    badURL,
    myHelmet,
    myMorgan
}
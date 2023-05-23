import helmet from 'helmet';
import morgan from 'morgan';
export const myHelmet = helmet();
export const myMorgan = morgan('dev');
import {getApiKey} from "./services/services.js";
import swaggerJsDoc from "swagger-jsdoc";


export function validateInput(req, res, next){
    const userInput = req.body;
    const regex = /[@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
    const containsSpecialChars = regex.test(userInput);
    if (containsSpecialChars) return res.send(400, "Неправильные данные");
    next();
}

// export function authorizationApi(req, res, next){
//     if (req.headers["api-key"]!== "nnnn"){
//         res.send(400, "Неправильный ключ")
//     } else next();
// }

export async function authorizationApi(req, res, next){
    const keys = await getApiKey();
    if (keys) {
        if (keys.includes(req.headers["api-key"]) && req.method !== "GET" && req.url !== "/login") {
            return res.status(403).send('access denied')
        }
        else{
            next();
        }
    }else{
        res.send('not api-key in databases');
    }
}

export function badURL(req, res){
    res.status(400).send("Такой страницы не существует");
}

export async function err(err, req, res, next){
    err.status = 500;
    res.status(err.status).send(err.message);
}


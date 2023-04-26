import helmet from 'helmet';
import morgan from 'morgan';
export const myHelmet = helmet();
export const myMorgan = morgan('dev');
//import {getApiKey} from "/StudesWeb/2-sem/6/services/service.js";


export function validateInput(req, res, next){
    const userInput = req.body;
    const regex = /[@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
    const containsSpecialChars = regex.test(userInput);
    if (containsSpecialChars){
         res.send(400, "Неправильные данные")
    } else next();
}

export function authorizationApi(req, res, next){
    if (req.headers["api-key"]!== "nnnn"){
        res.send(400, "Неправильный ключ")
    } else next();
}

// export async function authorizationApi(req, res, next){
//     const keys = await getApiKey();
//     if (keys) {
//         if (keys.includes(req.headers["api-key"]) && req.method !== "GET" && req.url !== "/login") {
//             return res.status(403).send('access denied')
//         }
//         else{
//             next();
//         }
//     }else{
//         res.send('not api-key in databases');
//     }
// }

export function badURL(req, res){
    res.status(400).send("Такой страницы не существует");
}


import {Router} from "express";
import {getAllStats, getMainText, getComments, postAddComments, getMyComments} from './controllers/controllers.js';
import {validateInput} from "./Middleware.js";

const handlers2 = Router();

handlers2.get('/', getMainText);
handlers2.get('/stats', validateInput, getAllStats);
handlers2.get('/comments/:id', getMyComments);
handlers2.get('/comments', getComments);
handlers2.post('/comments', postAddComments);

export default handlers2;
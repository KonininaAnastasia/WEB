import {Router} from "express";
import {getMainText, getModels, getComments, postAddComments, getMyComments, findModel, addModels, updateModel, 
    deleteModel,  addUser, deleteUser} from './controllers/controllers.js';
import {authorizationApi} from "./Middleware.js";

const handlers3 = Router();

 handlers3.get('/', getMainText);
 handlers3.get('/comments/:id', getMyComments);
 handlers3.get('/comments', getComments);
 handlers3.get('/models', getModels);
 handlers3.get('/models/:id', findModel);

 handlers3.post('/comments', postAddComments);
 handlers3.post('/models', authorizationApi, addModels);

 handlers3.put('/models/:id', updateModel);
 handlers3.delete('/models/:id', deleteModel);

 handlers3.post('/login', addUser);
 handlers3.delete('/account/delete', deleteUser);

export default handlers3;
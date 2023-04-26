import {Router} from "express";
import {getAllStats, getMainText, getComments} from './main.js'
import {validateInput} from "./Middleware.js";

const router = Router();

router.get('/', getMainText);
router.get('/stats', validateInput, getAllStats);
router.post('/comments', validateInput, getComments);

export default router
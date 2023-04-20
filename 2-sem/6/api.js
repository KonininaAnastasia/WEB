
const {Router} = require("express");
const {getAllStats, getMainText, getComments} = require('./main.js');
const { validateInput } = require("./Middleware.js");


const router = Router();

router.get('/', getMainText);
router.get('/stats', validateInput, getAllStats);
router.post('/comments', validateInput, getComments);

module.exports = router;
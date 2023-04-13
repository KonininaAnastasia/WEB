
const {Router} = require("express");
const {getAllStats, getMainText, getComments} = require('./main.js');


const router = Router();

router.get('/', getMainText);
router.get('/stats', getAllStats);
router.post('/comments', getComments);

module.exports = router;
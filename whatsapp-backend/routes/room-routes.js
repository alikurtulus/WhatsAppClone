const express = require('express') 
const router = express.Router()
const {check} = require('express-validator') 
const roomController = require('../controllers/roomController')

router.get('/sync', roomController.getRooms)
router.get('/sync/:roomId',roomController.getRoom)
router.post('/new',[
    check('name').not().isEmpty(),
    check('image').not().isEmpty()
],roomController.createRoom)


module.exports = router


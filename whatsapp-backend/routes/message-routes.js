const express = require('express')
const router = express.Router()
const messageController  = require('../controllers/messageController')

router.get('/sync', messageController.getMessages)
router.get('/message/:messageId',messageController.getMessage)
router.post('/room/:roomId',messageController.createMessage)
router.delete('/messages/delete/:messageId',messageController.deleteMessage)
module.exports = router


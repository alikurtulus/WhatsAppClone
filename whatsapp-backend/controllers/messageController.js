const HttpError  = require( '../models/HttpError')
const mongoose = require('mongoose') 
const {validationResult} = require('express-validator')
const  Message =  require('../models/Message')
const Room = require('../models/Room')

const getMessages = async (req, res, next) => {
    let messages 
    try{
        messages = await Message.find({}).exec()
    }
    catch(err){
    const error = new HttpError('Something went wrong',500)
    return next(error)
    }
    if(!messages){
    const error = new HttpError('Could not find any recipe',404)
    return next(error)
    }
    res.status(200).json({messages:messages.map(message => message.toObject({getters:true}))})
}

const getMessage = async (req, res, next) => {
    const {messageId} = req.body
    let message
    try{
    existingMessage = await Message.findById(messageId).exec()
    if(!existingMessage){
        const error = new HttpError('Could not find any recipes provided user id',404)
        return next(error)
    }
    res.status(200).json({message:existingMessage.toObject({getters:true})})
    }
    catch(err){
        const error = new HttpError('Something went wrong',500)
        return next(error)
    }
}
const createMessage = async (req, res, next) => {
    const roomId = req.params.roomId
    console.log(roomId)
    const errors = validationResult(req)
    if(roomId){
        if(!errors.isEmpty()){
            const error = new HttpError('Invalid inputs passed, please check your data.',422)
            return next(error)
            }
            let existingRoom 
            try{
                existingRoom = await Room.findById(roomId).exec()
                console.log(existingRoom)
                if(!existingRoom){
                    const error = new HttpError('this room does not exist ...')
                    return next(error)         
                }
                const {message,name,received} = req.body
                let newMessage
                try{
                     newMessage = new Message({
                        message:message,
                        name:name,
                        received:received
                    })
                    console.log(newMessage)
                await  existingRoom.messages.push(newMessage)
                }
                catch(err){
                    const error = new HttpError('Something went wrong',500)
                    return next(error)
                }
                try{
                    await existingRoom.save()
                }
                catch(err){
                    const error = new HttpError('Something went wrong',500)
                    return next(error)
                }
                res.status(201).json({room:existingRoom.toObject({getMessage:true})})
            }
            catch(err){
                const error = new HttpError('Something went wrong',500)
                return next(error)
            }
    }
   
   
}
const deleteMessage = async (req, res, next) => {
    const {messageId} = req.body
    let existingMessage
    try{
    existingMessage = await Message.findById(messageId).exec()
    if(!existingMessage){
        const error = new HttpError('Could not find any recipes provided user id',404)
        return next(error)
    }
    else{
        const sess = await mongoose.startSession()
        sess.startTransaction()
        await existingMessage.remove({session:sess})
        await sess.commitTransaction()
    }
    res.status(200).json({message:'Deleted message'})
    }
    catch(err){
        const error = new HttpError('Something went wrong',500)
        return next(error)
    }
}
exports.createMessage = createMessage
exports.getMessage = getMessage
exports.getMessages = getMessages
exports.deleteMessage = deleteMessage
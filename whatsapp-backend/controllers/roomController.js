const HttpError  = require( '../models/HttpError')
const mongoose = require('mongoose')
const Room = require('../models/Room')
const {validationResult} = require('express-validator')


const getRooms = async (req, res, next) => {
    let rooms 
    try{
        rooms = await Room.find({}).exec()
    }
    catch(err){
    const error = new HttpError('Something went wrong',500)
    return next(error)
    }
    if(!rooms){
    const error = new HttpError('Could not find any room',404)
    return next(error)
    }
    res.status(200).json({rooms:rooms.map(room => room.toObject({getters:true}))})
}

const getRoom = async (req, res, next) => {
    const roomId = req.params.roomId
    console.log(roomId)
    let existingRoom
    try{
    existingRoom = await Room.findById(roomId).exec()
    if(!existingRoom){
        const error = new HttpError('Could not find any room provided user id',404)
        return next(error)
    }
    res.status(200).json({room:existingRoom.toObject({getters:true})})
    }
    catch(err){
        const error = new HttpError('Something went wrong',500)
        return next(error)
    }
}
const createRoom = async (req, res, next) => {
    const errors = validationResult(req)
    console.log(errors)
    if(!errors.isEmpty()){

        const error = new HttpError('Invalid inputs passed, please check your data.',422)
        return next(error)
    } 
    const {name,image} = req.body
    let newRoom
    try{
         newRoom = new Room({
            name:name,
            image:image,
            messages:[]
        })
    await  newRoom.save()
    }
    catch(err){
        const error = new HttpError('Something went wrong',500)
        return next(error)
    }
    res.status(201).json({room:newRoom})
}

exports.createRoom = createRoom
exports.getRoom = getRoom
exports.getRooms = getRooms

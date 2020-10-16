const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
mongoose.set('useCreateIndex', true);
const messageSchema = require('./Message').schema


const roomSchema = mongoose.Schema({
    name: String,
    image: String,
    messages: [messageSchema]
})
roomSchema.plugin(uniqueValidator)  
module.exports = mongoose.model('Room',roomSchema)
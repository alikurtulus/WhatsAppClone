import mongoose from 'mongoose'


const roomSchema = mongoose.Schema({
    name: String,
    image: String
})
export default mongoose.model('rooms',roomSchema)
// importing all stuff
import express from 'express'
import mongoose from 'mongoose'
import Messages from './dbMessages.js'
import Pusher from 'pusher'
import cors from 'cors'

// app config 
const app = express()
const port = process.env.PORT || 9000

const pusher = new Pusher({
    appId: '1088082',
    key: '0db53fdb4a3dd2c3d8d9',
    secret: 'a63acfc587cd752ae192',
    cluster: 'eu',
    encrypted: true
  });
  
// middleware config
app.use(express.json())
app.use(cors())

// db config
const conectionUrl =`mongodb+srv://alikurtulush:Un3xEsBi7JuYC1Q4@cluster0.byrjx.mongodb.net/whatsappdb?retryWrites=true&w=majority`
mongoose.connect(conectionUrl, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection
db.once('open', () => {
    console.log('db connected ...')
    const msgCollection = db.collection('messagecontents')
    const changeStream = msgCollection.watch()
    changeStream.on('change', (change) => {
        console.log(change)
        if(change.operationType === 'insert'){
            const messageDetails = change.fullDocument;
            pusher.trigger('messages','inserted', {
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received:messageDetails.received
            })
        }
        else{
            console.log('Error triggering Pusher')
        }
    })
})

// api routes stuff
app.get('/', (req, res) => res.status(200).send('hello world'))
app.get('/api/v1/messages/sync', (req,res)=> {
    Messages.find((err,data) => {
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    })
})

app.post('/api/v1/messages/new', (req,res) => {
    const dbMessage = req.body
    Messages.create(dbMessage, (err, data) => {
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(201).send(data)
        }
    })
})
// listen 
app.listen(port, () => console.log(`Listening on localhost:${port}`))
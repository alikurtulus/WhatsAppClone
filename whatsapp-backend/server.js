// importing all stuff
const express = require('express')
const mongoose = require('mongoose') 
const Pusher = require('pusher')
const cors = require('cors')
const  HttpError = require('./models/HttpError')
const messageRouter = require('./routes/message-routes')
const roomRouter  = require('./routes/room-routes')

// app config 
const app = express()
const port = process.env.PORT || 9000

const pusher = new Pusher({
    appId: '1088082',
    key: '0db53fdb4a3dd2c3d8d9',
    secret: 'a63acfc587cd752ae192',
    cluster: 'eu',
    useTLS: true,
  });
  
// middleware config
app.use(express.json())
app.use((req, res, next) => {                                                   // We need to write this middleware. Because We decide to  how to get a request from the client.This is like protocol between server and client for the communication.
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Headers',
                  'Origin, X-Request-With, Content-Type, Accept, Authorization'
  )
   res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE')
    next()
  })
  
app.use('/api/v1/rooms', roomRouter)
app.use('/api/v1/messages',messageRouter)


app.use((req, res, next) => {                                                   // When the client try to access wrong routes. We need to say the client is going wrong way.
    const error = new HttpError('Could not find this route', 404)
    throw error
  })
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
    const msgCollection = db.collection('rooms')
    const changeStream = msgCollection.watch()
    changeStream.on('change', (change) => {
        console.log(change)
        if(change.operationType === 'insert'){
            const messageDetails = change.fullDocument;
            pusher.trigger('rooms','inserted', {
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

/*
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

app.get('/api/v1/rooms/sync', (req,res) => {
    const dbRoom = req.body
    Room.find((err,data) => {
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    })
})

app.post('/api/v1/rooms/new', (req,res) => {
    const dbRoom = req.body
    Room.create(dbRoom, (err, data) => {
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(201).send(data)
        }
    })
})
*/
// listen 
app.listen(port, () => console.log(`Listening on localhost:${port}`))
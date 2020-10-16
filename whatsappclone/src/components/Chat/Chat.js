import React,{useState, useEffect} from 'react'
import './Chat.css'
import {Avatar, IconButton} from '@material-ui/core'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import MicIcon from '@material-ui/icons/Mic'
import {AttachFile, MoreVert, SearchOutlined} from '@material-ui/icons'
import axios from '../../axios'
import {useParams} from 'react-router-dom'
import {useStateValue} from '../../StateProvider'

const  Chat = ({messages }) => {
    const [seed,setSeed] = useState('')
    const [input, setInput] = useState('')
    const {roomId} = useParams()
    const [room,setRoom] = useState({})
    const [{user},dispatch] = useStateValue()
    const [allMessages, setAllMessages] = useState([])
    

    useEffect(() => {
      axios.get(`/api/v1/rooms/sync/${roomId}`)
      .then(res => {
        console.log(res.data)
        setAllMessages(res.data.room.messages)
      })
      .catch(err => {
        console.log(err)
      })

    },[roomId])

    const sendMessage = async (e) => {
      e.preventDefault()
     await axios.post(`/api/v1/messages/room/${roomId}`, {
        "message":input,
        "name":user.displayName,
        "received":true
      })
     .then(res => {
       console.log(res.data)
       const roomMessages = res.data.room
       setAllMessages(roomMessages.messages)
     })
      
      setInput('')
    }

    useEffect(() =>{
        setSeed(Math.floor(Math.random() * 5000))
    },[])


    return (
        <div  className="chat">
            <div className="chat_header">
              <Avatar src={room.name ? room.image :`https://avatars.dicebear.com/api/human/${seed}.svg`} />
              <div className="chat_headerInfo">
                <h3>{room.name}</h3>
                <p>Last message...</p>
              </div>
              <div className="chat_headerRight">
                <IconButton>
                  <SearchOutlined />
                </IconButton>
                <IconButton>
                  <AttachFile/>
                </IconButton>
                <IconButton>
                  <MoreVert />
                </IconButton>
              </div>
            </div>
            <div className="chat_body">
              {allMessages !== undefined && allMessages.map(message => (
                  <p key={message._id} className={`chat_message ${message.received && "chat_receiver"}`} >
                    <span className="chat_name">{message.name}</span>
                      {message.message}
                    <span className="chat_timestamp">{message.timestamp}</span>
                  </p>
              ))}
            </div>
            <div className="chat_footer">
              <InsertEmoticonIcon />
              <form>
                 <input value={input} onChange={e => setInput(e.target.value)} type="text" placeholder="Type a message" /> 
                 <button onClick={sendMessage} type="submit" >Send a message</button>
              </form>
              <MicIcon />
            </div>
        </div>
    )
}

export default Chat

import React,{useState, useEffect} from 'react'
import './Chat.css'
import {Avatar, IconButton} from '@material-ui/core'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import MicIcon from '@material-ui/icons/Mic'
import {AttachFile, MoreVert, SearchOutlined} from '@material-ui/icons'
import axios from '../../axios'
const  Chat = ({messages}) => {
    const [seed,setSeed] = useState('')
    const [input, setInput] = useState('')
    const sendMessage = async (e) => {
      e.preventDefault()
     await axios.post('/api/v1/messages/new', {
        "message":input,
        "name":"Ali K",
        "timestamp":"Just now",
        "received":true
      })
      setInput('')
    }
    useEffect(() =>{
        setSeed(Math.floor(Math.random() * 5000))
    },[])
    return (
        <div  className="chat">
            <div className="chat_header">
               <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
               <div className="chat_headerInfo">
                <h3>Room name</h3>
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
              {messages.map(message => (
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

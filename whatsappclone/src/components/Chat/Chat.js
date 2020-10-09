import React,{useState, useEffect} from 'react'
import './Chat.css'
import {Avatar, IconButton} from '@material-ui/core'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import MicIcon from '@material-ui/icons/Mic'
import {AttachFile, MoreVert, SearchOutlined} from '@material-ui/icons'
const  Chat = () => {
    const [seed,setSeed] = useState('')
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
              <p className='chat_message'>
                <span className="chat_name">Ertan</span>
                  Napan cuz?
                  <span className="chat_timestamp">{new Date().toUTCString()}</span>
              </p>
              <p className={`chat_message ${true && 'chat_receiver'}`}>
              <span className="chat_name">Ali K</span>
               I'm good cuz,you?
                <span className="chat_timestamp">{new Date().toUTCString()}</span>
              </p>
            </div>
            <div className="chat_footer">
              <InsertEmoticonIcon />
              <form>
                 <input type="text" placeholder="Type a message" /> 
                 <button type="submit" >Send a message</button>
              </form>
              <MicIcon />
            </div>
        </div>
    )
}

export default Chat

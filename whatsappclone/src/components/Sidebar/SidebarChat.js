import React, {useState, useEffect} from 'react'
import './SidebarChat.css'
import {Avatar} from '@material-ui/core'
import {Link} from 'react-router-dom'
import db from '../../firebase'
const SidebarChat = ({name,id}) => {
    const [seed,setSeed] = useState('')
    const [messages,setMessages]= useState('')
  
    useEffect(() => {
        if(id){
        db.collection('rooms')
        .doc(id).collection('messages')
        .orderBy('timestamp','desc')
        .onSnapshot((snapshot) => {setMessages(snapshot.docs.map((doc) => doc.data()))})
        }
    },[id])
    useEffect(() => {
       setSeed(Math.floor(Math.random() * 5000))
    },[])

    return (
        <Link to={`/rooms/${id}`}>
            <div  className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="sidebarChat_info">
                    <h3>{name}</h3>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
        </Link>
        )
    
}

export default SidebarChat

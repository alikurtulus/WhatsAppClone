import React, {useState, useEffect} from 'react'
import './SidebarChat.css'
import {Avatar} from '@material-ui/core'
import {Link} from 'react-router-dom'

const SidebarChat = ({room,id}) => {
  
    const openChat = () =>{
      
        
    }

    return (
        <Link to={`/rooms/${id}`}>
            <div  className="sidebarChat">
                <Avatar src={room.image} />
                <div className="sidebarChat_info">
                    <h3>{room.name}</h3>
                    <p>Last message...</p>
                </div>
            </div>
        </Link>
        )
    
}

export default SidebarChat

import React, {useState, useEffect} from 'react'
import './SidebarChat.css'
import {Avatar} from '@material-ui/core'
import axios from '../../axios'

const SidebarChat = ({addNewChat,room}) => {
    const [rooms,setRooms] = useState([])
    useEffect(() => {
        axios.get('/api/v1/rooms/sync')
        .then(res => {
            setRooms(res.data)
        })
    },[])
    const createChat = () =>{
        const roomName = prompt("Please enter name for chat")
        const isRoomNew = rooms.filter( r => r.name === roomName)
        if(isRoomNew.length !== 0){
           //do some clever database stuff

        }
        else{
            alert('This room already exists')
        }
    }

    return  !addNewChat ? (
        <div className="sidebarChat">
            <Avatar src={room.image} />
            <div className="sidebarChat_info">
            <h3>{room.name}</h3>
                <p>Last message...</p>
            </div>
        </div>
    ) : (
        <div onClick={createChat} className="sidebarChat">
            <h2>Add new chat</h2>
        </div>
    )
}

export default SidebarChat

import React, {useEffect,useState} from 'react'
import './Sidebar.css'
import {Avatar, IconButton} from '@material-ui/core'
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import SearchOutlined from '@material-ui/icons/SearchOutlined'
import SidebarChat from './SidebarChat'
import axios from '../../axios'

const Sidebar = () => {
  const [rooms,setRooms] = useState([])
  useEffect(() => {
    axios.get('/api/v1/rooms/sync')
    .then(res => {
      console.log(res.data)
      setRooms(res.data)
    })
  },[])
    return (
        <div className="sidebar">
            <div className="sidebar_header">
              <Avatar />
              <div className="sidebar_headerRight">
                 <IconButton>
                   <DonutLargeIcon />
                 </IconButton>
                 <IconButton>
                   <ChatIcon />
                 </IconButton>
                 <IconButton> 
                   <MoreVertIcon />
                 </IconButton>
              </div>
            </div>
            <div className="sidebar_search">
              <div className="sidebar_searchContainer">
                <SearchOutlined />
                <input placeholder="Search or start new chat" type="text"/>
              </div>
            </div>
            <div className="sidebar_chats">
              <SidebarChat addNewChat />
              {rooms.map(room => (
                <SidebarChat key={room._id} id={room._id} room={room}  />
              ))}
              
            
            </div>
        </div>
    )
}

export default Sidebar

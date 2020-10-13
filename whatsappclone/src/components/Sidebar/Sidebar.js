import React, {useEffect,useState} from 'react'
import './Sidebar.css'
import {Avatar, IconButton} from '@material-ui/core'
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import SearchOutlined from '@material-ui/icons/SearchOutlined'
import AddIcon from '@material-ui/icons/Add';
import SidebarChat from './SidebarChat'
import axios from '../../axios'

const Sidebar = () => {
  const [rooms,setRooms] = useState([])
  const [searchTerm,setSearchTerm] = useState('')
  const [searchResults,setSearchResults] = useState([])
  const [isSearched,setIsSearched] = useState(false)
  const [seed,setSeed] = useState('')
 
  useEffect(() => {
    if(searchTerm === ''){
      axios.get('/api/v1/rooms/sync')
      .then(res => {
        setRooms(res.data)
        setSearchResults(res.data)
        setSeed(Math.floor(Math.random() * 5000))
      })
    }
    else{
        const getResults = rooms.filter( r => r.name.toLowerCase().includes(searchTerm.toLowerCase()))
        console.log(getResults.length)
        setSearchResults(getResults)
        if(getResults.length === 0){
          setIsSearched(true)
        }
        else{
          setIsSearched(false)
        }
    }
  },[searchTerm])
  const handleChange = (e) => {
    setSearchTerm(e.target.value)

  }
  const addNewChat = async (e) => {
    e.preventDefault()
    await axios.post('/api/v1/rooms/new',{
      "name":searchTerm,
      "image":`https://avatars.dicebear.com/api/human/${seed}.svg`
    })
    setSearchTerm('')
    axios.get('/api/v1/rooms/sync')
    .then(res => {
      setSearchResults(res.data)
    })

  }

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
                {!isSearched ? ( <SearchOutlined />):(<a onClick={addNewChat} className="btn_chat_add"><AddIcon /></a>)} 
                <input placeholder={!isSearched ? 'Search or start new chat' : 'Add a new chat'} type="text" onChange={handleChange} />
              </div>
            </div>
            <div className="sidebar_chats">
              {searchResults.map(room => (
                <SidebarChat key={room._id} id={room._id} room={room} />
              ))}
              
            
            </div>
        </div>
    )
}

export default Sidebar

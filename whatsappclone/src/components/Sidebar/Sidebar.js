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
import {useStateValue} from '../../StateProvider'
import db from '../../firebase'

const Sidebar = () => {
  const [rooms,setRooms] = useState([])
  const [searchTerm,setSearchTerm] = useState('')
  const [searchResults,setSearchResults] = useState([])
  const [isSearched,setIsSearched] = useState(false)
  const [isIconChange,setIsIconChange] = useState(false)
  const [seed,setSeed] = useState('')
  const [{user}, dispatch] = useStateValue()
  useEffect(() => {
   const unsubscribe =  db.collection('rooms').onSnapshot(snapshot => {
      setRooms(snapshot.docs.map(doc => ({
        id:doc.id,
        data:doc.data()
      })))
    })
    setSeed(Math.floor(Math.random() * 5000))
    return () => {
      unsubscribe()
    }
  },[])
  useEffect(() => {
    if(searchTerm === ''){
      setIsSearched(false)
      setIsIconChange(false)
    }
    else{
      const getResults = rooms.filter( r => r.data.name.toLowerCase().includes(searchTerm.toLowerCase()))
      console.log(getResults.length)
      if(getResults.length === 0){
        setSearchResults(getResults)
        setIsIconChange(true)
      }
      else{
        setIsSearched(true)
        setIsIconChange(false)
        setSearchResults(getResults)
      }
      
    }
   
  },[searchTerm])
  const handleChange = (e) => {
    setSearchTerm(e.target.value)

  }

  const addNewChat = async (e) => {
   
    if(searchTerm){
      db.collection('rooms').add({
        name:searchTerm,
      })
      setSearchTerm('')

    }
      
  }

    return (
        <div className="sidebar">
            <div className="sidebar_header">
              <Avatar src={user?.photoURL}/>
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
                {!isIconChange ? ( <SearchOutlined />) : (<a onClick={addNewChat} className="btn_chat_add"><AddIcon /></a>)} 
                <input placeholder={!isSearched ? 'Search or start new chat' : 'Add a new chat'} type="text" onChange={handleChange} />
              </div>
            </div>
            <div className="sidebar_chats">
              {!isSearched ? rooms.map(r => (
                <SidebarChat key={r.id} id={r.id} name={r.data.name} />
              )) : searchResults.map(r => (
                <SidebarChat key={r.id} id={r.id} name={r.data.name} />
              ))}
              
            
            </div>
        </div>
    )
}

export default Sidebar

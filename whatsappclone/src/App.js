import React, {useEffect, useState} from 'react';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar'
import Chat from './components/Chat/Chat'
import {BrowserRouter as Router,Switch,Route, useParams} from 'react-router-dom'
import Login from './components/Login/Login'
import {useStateValue} from './StateProvider'

function App() {
  const [messages,setMessages] = useState([])
  const [{user}, dispatch] = useStateValue()
  /*
  useEffect(() => {
    axios.get('/api/v1/rooms/sync')
    .then(res => {
      const {rooms} = res.data
      if(rooms){
        setMessages(rooms[0].messages)
      }
     
    })
  },[messages])
  useEffect(()=> {
    const pusher = new Pusher('0db53fdb4a3dd2c3d8d9', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      
      if(roomId !== undefined){
        axios.get(`/api/v1/rooms/sync/${roomId}`)
        .then(res => {
          console.log(res.data)
        })
      }
    
      setMessages([...messages,newMessage])
    });
    *
    return () => {
      channel.unbind_all()
      channel.unsubscribe()
    }
  },[messages])
  */
  return (
    //BEM naming convention
    <div className="app">
      {!user ? (
        <Login />
      ) : 
         (<div className="app_body">
            <Router>
              <Sidebar />
              <Switch>
                <Route path="/rooms/:roomId">
                  <Chat   />
                </Route>
                <Route  path="/" >
                  <Chat  />
                </Route>
              </Switch>
            </Router>
        </div>)
      }
    </div>
  );
}
export default App;

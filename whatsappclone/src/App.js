import React, {useEffect, useState} from 'react';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar'
import Chat from './components/Chat/Chat'
import Pusher from 'pusher-js'
import axios from './axios'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'

function App() {
  const [messages,setMessages] = useState([])
  useEffect(() => {
    axios.get('/api/v1/messages/sync')
    .then(res => {
      setMessages(res.data)
    })
  },[])
  useEffect(()=> {
    const pusher = new Pusher('0db53fdb4a3dd2c3d8d9', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      setMessages([...messages,newMessage])
    });
    return () => {
      channel.unbind_all()
      channel.unsubscribe()
    }
  },[messages])

  return (
    //BEM naming convention
    <div className="app">
      <div className="app_body">
        <Router>
          <Switch>
           <Sidebar />
            <Route path="/rooms/:roomId">
              <Chat messages={messages} />
            </Route>
            <Route exact path="/" >
              <Chat messages={messages} />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;

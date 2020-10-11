import React, {useEffect, useState} from 'react';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar'
import Chat from './components/Chat/Chat'
import Pusher from 'pusher-js'
import axios from './axios'

function App() {
  const [messages,setMessages] = useState([])
  useEffect(() => {
    axios.get('/api/v1/messages/sync')
    .then(res => {
      console.log(res.data)
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
  console.log(messages)
  return (
    //BEM naming convention
    <div className="app">
      <div className="app_body">
        <Sidebar />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;

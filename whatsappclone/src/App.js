import React from 'react';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar'
import Chat from './components/Chat/Chat'

function App() {
  return (
    //BEM naming convention
    <div className="app">
      <div className="app_body">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

export default App;

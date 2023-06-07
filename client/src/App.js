import React, { useState } from 'react';
import './App.css';
import Form from './pages/Form';
import Chat from './pages/Chat';


function App() {

  const [conversation, setConversation] = useState([]);

  return (
    <div className="App">
      <div id="mainDiv">
      {
        conversation.length === 0
          ? <div id='chat_container'></div>
          : conversation.map((item) => <Chat key={item.id} conversation={item} />)
      }
      </div>
      <Form conversation={conversation} setConversation={setConversation} />
    </div>
  );
}

export default App;

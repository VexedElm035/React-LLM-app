import React from 'react'
import './home.css'
import { useState } from 'react';
import { Message } from './../../components/index';

const Home = () => {
  const [textMessage, setText] = useState('');
  
  const [messagesList, setMessageList] = useState([]);
  
  const sendMessage = async () => {
    setMessageList([
      ...messagesList,
      {
        content: textMessage,
        role: 'user'
      }
    ]);
    
    try {
      const response = await fetch('http://localhost:8080/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: 'user', content: textMessage })
      });

      const data = await response.json();

      setMessageList(prev => [
        ...prev,
        { content: data.response.content, role: data.response.role}
      ])

    } catch (error){
      console.error("Error sending message:", error);
    }

    setText('');

  };
  return (
    <div className='home-container'>
      <div className='chat-container'>
        
        <div className="messages-container">
          {messagesList.map((message, index) => (
            <Message 
              key={index}
              content={message.content}
              role={message.role}
            />
          ))}
          </div>

        <div className='input-container'>
          <input value={textMessage} type="text" onChange={ e => setText(e.target.value)} />
          <button disabled={!textMessage} onClick={sendMessage}>Enviar</button>
        </div>
       </div>
      
    </div>
  )
}

export default Home
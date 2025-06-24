import React from 'react'
import './home.css'
import { useState } from 'react';
import { Message } from './../../components/index';

const Home = () => {
  const [textMessage, setText] = useState('');
  
  const messages = ["Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea corporis inventore ipsa, blanditiis laudantium quia non cupiditate iure hic porro iste doloremque, est error eveniet aspernatur corrupti possimus commodi tempore.", "como estas", "adios"];
  const [messagesList, setMessageList] = useState([]);
  
  const sendMessage = () => {
    setMessageList([
      ...messagesList,
      {
        content: textMessage,
        user: true
      },
      {
        //receiveMessage();
        content: messages[0],
        user: false
      }
    ]);
    
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
              user={message.user}
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
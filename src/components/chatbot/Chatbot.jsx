import React from 'react'
import './chatbot.css'
import { useState, useEffect, useRef} from 'react';
import { Message } from './../index';


const Chatbot = ({isActive}) => {
  
  const [textMessage, setText] = useState('');
  const [messagesList, setMessageList] = useState([]);
  const [menuDrop, setMenuDrop] = useState(false);



  const bottomRef = useRef(null);
  const enterFlagRef = useRef(0);
  
  useEffect(() => {
    bottomRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [messagesList]);

  const onEnterPress = (e) => {
    if(e.keyCode === 13 && e.shiftKey === false && enterFlagRef.current === 0 && textMessage.trim() ) {
      e.preventDefault();
      sendMessage();
    }
    else if (e.keyCode === 13 && e.shiftKey === true && textMessage.trim()) {
      enterFlagRef.current = 1;
    }
  }

  const sendMessage = async () => {
    
    setMessageList([
      ...messagesList,
      {
        content: textMessage,
        role: 'user'
      }
    ]);
    setText('');
    enterFlagRef.current = 0;
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

  };

  const toogleMenu = () => {
    setMenuDrop(prev => (prev === false ? true : false));
  }

  return (
      <div className='chat-container'>
        
        <div className='chat-header'>
          <button className='close-button' onClick={toogleMenu}> = </button>
          <button className='close-button' onClick={isActive}> X </button>
          {menuDrop && (
            <div className='menu-container'>
              <button onClick={toogleMenu}> = </button>
              <button> Limpiar Chat</button>

            </div> 
          )}
        </div>

        <div className="messages-container">

           {messagesList.length === 0 && (
              <div className='welcome-container'>
                <p>¿Con qué puedo ayudarte?</p>
              </div>
            )}
          
          {messagesList.map((message, index) => (
            <Message 
              key={index}
              content={message.content}
              role={message.role}
            />
          ))}
          <div ref={bottomRef} />
          </div>

        <div className='input-container'>
          <div className='input-box'>
            <textarea value={textMessage} type="text" onChange={ e => setText(e.target.value)} onKeyDown={onEnterPress}/>
            <button className={!textMessage.trim() ? 'dis-button' : 'en-button'} disabled={!textMessage.trim()} onClick={sendMessage}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#009688"
              >
                <path d="M10 14l11 -11" />
                <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
              </svg>
            </button>
          </div>

          {/* <div className='tools-container'>
            <p>herramientas</p>
            <p>y</p>
            <p>x</p>
          </div> */}

        </div>
       </div>
  )
}

export default Chatbot
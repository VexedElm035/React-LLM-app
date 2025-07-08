import React, { useState, useEffect, useRef } from 'react';
import { Send, Copy, RotateCcw, Download, Trash2, Menu, X, Bot, User, Volume2 } from 'lucide-react';
import { Message } from './../index';
import './chatbot.css'

const Chatbot = () => {
  const [textMessage, setText] = useState('');
  const [messagesList, setMessageList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true);

  const bottomRef = useRef(null);
  const enterFlagRef = useRef(0);
  const textareaRef = useRef(null);
  useEffect(() => {
    if (autoScroll) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messagesList, autoScroll]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [textMessage]);

  const onEnterPress = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false && enterFlagRef.current === 0 && textMessage.trim() && !isLoading) {
      e.preventDefault();
      sendMessage();
    } else if (e.keyCode === 13 && e.shiftKey === true && textMessage.trim()) {
      enterFlagRef.current = 1;
    }
  };

  const sendMessage = async () => {
    if (isLoading) return;
    
    const userMessage = textMessage;
    setMessageList(prev => [
      ...prev,
      {
        content: userMessage,
        role: 'user',
      }
    ]);
    setText('');
    enterFlagRef.current = 0;
    setIsLoading(true);

    const assistantMessageIndex = messagesList.length + 1;
    setMessageList(prev => [
      ...prev,
      { 
        content: '', 
        role: 'assistant', 
        isStreaming: true,
      }
    ]);

    try {
      // Simulación de streaming (reemplaza con tu API real)
      const mockResponse = "Esta es una respuesta de ejemplo que simula el streaming. Puedes ver cómo se va agregando el texto progresivamente. \n\n**Características principales:**\n\n• Diseño responsivo y moderno\n• Modo oscuro/claro\n• Copiar mensajes\n• Exportar conversación\n• Auto-scroll configurable\n\n```javascript\nconst ejemplo = () => {\n  console.log('Código de ejemplo');\n  return 'Hola mundo';\n};\n```\n\n¿Te gusta el nuevo diseño?";
      
      for (let i = 0; i <= mockResponse.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 20));
        setMessageList(prev => 
          prev.map((msg, index) => 
            index === assistantMessageIndex ? 
            { ...msg, content: mockResponse.slice(0, i) } : msg
          )
        );
      }

      setMessageList(prev => 
        prev.map((msg, index) => 
          index === assistantMessageIndex ? 
          { ...msg, isStreaming: false } : msg
        )
      );

    } catch (error) {
      console.error("Error sending message:", error);
      setMessageList(prev => 
        prev.map((msg, index) => 
          index === assistantMessageIndex ? 
          { ...msg, content: 'Error al enviar el mensaje', isStreaming: false } : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessageList([]);
  };

  const copyMessage = (content) => {
    navigator.clipboard.writeText(content);
  };

  const regenerateResponse = () => {
    if (messagesList.length > 0 && messagesList[messagesList.length - 1].role === 'assistant') {
      setMessageList(prev => prev.slice(0, -1));
      // Reenviar el último mensaje del usuario
      const lastUserMessage = [...messagesList].reverse().find(msg => msg.role === 'user');
      if (lastUserMessage) {
        setText(lastUserMessage.content);
        setTimeout(() => sendMessage(), 100);
      }
    }
  };

  const containerClass = `chat-container ${darkMode ? 'dark' : ''}`;

  return (
    <div className={containerClass}>
      <div className="chat-header">
        <div className="header-actions">
          <button 
            className="header-button"
            onClick={() => setDarkMode(!darkMode)}
            title="Cambiar tema"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
          
          <button 
            className="header-button"
            onClick={clearChat}>
            <Trash2 size={16} /> Limpiar chat
          </button>
        </div>
      </div>

      <div className="messages-container">
        {messagesList.length === 0 && (
          <div className="welcome-container">
            <div className="welcome-icon">
              <Bot size={48} />
            </div>
            <h2>¡Hola! Soy tu asistente IA</h2>
            <p>¿En qué puedo ayudarte hoy?</p>
            <div className="suggestion-chips">
              
              <button onClick={() => setText('Explícame qué es Ecosur')}>
                Explícame qué es Ecosur
              </button>
            
            </div>
          </div>
        )}
        
        {messagesList.map((message, index) => (
          <Message 
            key={index}
            content={message.content}
            role={message.role}
            isStreaming={message.isStreaming}
          />
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="input-container">
        <div className="input-wrapper">
          <textarea 
            ref={textareaRef}
            value={textMessage} 
            onChange={(e) => setText(e.target.value)}
            onKeyDown={onEnterPress}
            disabled={isLoading}
            placeholder="Escribe tu mensaje aquí..."
            className="message-input"
            rows={1}
          />
          <button 
            className={`send-button ${(!textMessage.trim() || isLoading) ? 'disabled' : ''}`}
            disabled={!textMessage.trim() || isLoading} 
            onClick={sendMessage}
            title="Enviar mensaje"
          >
            {isLoading ? (
              <div className="loading-spinner">⏳</div>
            ) : (
              <Send size={20} />
            )}
          </button>
        </div>
        
      </div>

      <style jsx>{`
        .chat-container {
          
          background: #ffffff;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .chat-container.dark {
          background: #1f2937;
          border-color: #374151;
        }

        .header-left h3 {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
        }

        .header-actions {
          display: flex;
          gap: 8px;
        }

        .header-button {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          border-radius: 8px;
          padding: 8px;
          color: black;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .header-button:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-1px);
        }

        .chat-container.dark .messages-container {
          background: #111827;
        }

        .welcome-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          text-align: center;
          animation: fadeIn 0.5s ease;
        }

        .welcome-icon {
          margin-bottom: 20px;
          padding: 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 50%;
          color: white;
        }

        .welcome-container h2 {
          margin: 0 0 10px 0;
          font-size: 24px;
          color: #374151;
        }

        .chat-container.dark .welcome-container h2 {
          color: #f3f4f6;
        }

        .welcome-container p {
          margin: 0 0 20px 0;
          color: #6b7280;
          font-size: 16px;
        }

        .chat-container.dark .welcome-container p {
          color: #9ca3af;
        }

        .suggestion-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          justify-content: center;
          max-width: 400px;
        }

        .suggestion-chips button {
          padding: 8px 16px;
          border: 1px solid #e5e7eb;
          border-radius: 20px;
          background: white;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 14px;
        }

        .suggestion-chips button:hover {
          background: #f3f4f6;
          transform: translateY(-2px);
        }

        .chat-container.dark .suggestion-chips button {
          background: #374151;
          border-color: #4b5563;
          color: #f3f4f6;
        }

        .message {
          display: flex;
          gap: 12px;
          animation: messageSlide 0.3s ease;
        }

        .input-container {
          padding: 20px;
          background: white;
          border-top: 1px solid #e5e7eb;
        }

        .chat-container.dark .input-container {
          background: #1f2937;
          border-color: #374151;
        }

        .input-wrapper {
          display: flex;
          gap: 12px;
          align-items: flex-end;
        }

        .message-input {
          flex: 1;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          padding: 12px 16px;
          font-size: 16px;
          line-height: 1.5;
          resize: none;
          transition: all 0.2s ease;
          font-family: inherit;
          background: white;
          min-height: 44px;
          max-height: 120px;
        }

        .message-input:focus {
          outline: none;
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }

        .chat-container.dark .message-input {
          background: #374151;
          border-color: #4b5563;
          color: #f3f4f6;
        }

        .chat-container.dark .message-input:focus {
          border-color: #6366f1;
        }

        .send-button {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 12px;
          padding: 12px;
          color: white;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 48px;
          height: 48px;
        }

        .send-button:hover:not(.disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }

        .send-button.disabled {
          background: #d1d5db;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .loading-spinner {
          animation: spin 1s linear infinite;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes messageSlide {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Scrollbar personalizada */
        .messages-container::-webkit-scrollbar {
          width: 8px;
        }

        .messages-container::-webkit-scrollbar-track {
          background: transparent;
        }

        .messages-container::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 4px;
        }

        .messages-container::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }

        .chat-container.dark .messages-container::-webkit-scrollbar-thumb {
          background: #4b5563;
        }

        .chat-container.dark .messages-container::-webkit-scrollbar-thumb:hover {
          background: #6b7280;
        }
      `}</style>
    </div>
  );
};

export default Chatbot;
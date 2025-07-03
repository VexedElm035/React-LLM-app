import React from 'react'
import './message.css'

const Message = ({content, role}) => {
  return (
    <div className='message-container'>
        <div className={ 'message-box ' + (role === 'user' ? 'user-style' : 'ia-style') }>
            <div><p>{content}</p></div>
        </div>
        
    </div>

    )
}

export default Message
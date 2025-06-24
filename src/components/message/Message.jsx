import React from 'react'
import './message.css'

const Message = ({content, user}) => {
  return (
    <div className='message-container'>
        <div className={user ? 'user-style' : 'ia-style'}>
            <div><p>{content}</p></div>
        </div>
        
    </div>

    )
}

export default Message
import React, { useState } from 'react';
import axios from 'axios';

function ChatViewer({ messages, userId, chatId, setLoader }) {
  const [message, setMessage] = useState('');

  const handleClick = () => {
    axios
      .post('/api/messages', {
        chatId,
        userId,
        message
      })
      .then(setLoader((prev) => !prev));
  };

  const handleChange = (value) => {
    setMessage(value);
  };

  return (
    <div className='chat-viewer container'>
      <div className='view-chat'>
        {messages.map((message) => (
          <div className={message.user_id === userId ? 'right' : 'left'}>
            <p>{message.message}</p>
            <p>{message.username}</p>
          </div>
        ))}
      </div>
      <div className='send-chat'>
        <input
          className='send-message'
          type='text'
          onChange={(e) => handleChange(e.target.value)}
        />
        <button className='send-chat-btn' type='button' onClick={handleClick}>
          SEND
        </button>
      </div>
    </div>
  );
}

export default ChatViewer;

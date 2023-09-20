import React from 'react';

function ChatViewer({ messages, userId }) {
  return (
    <div className='chat-viewer container'>
      <div className='view-chat'>
        {messages.map((message) => (
          <div className={message.user_id === userId ? 'right' : 'left'}>{message.message}</div>
        ))}
      </div>
      <div className='send-chat'>
        <input type='text' />
        <button type='submit'>SEND</button>
      </div>
    </div>
  );
}

export default ChatViewer;

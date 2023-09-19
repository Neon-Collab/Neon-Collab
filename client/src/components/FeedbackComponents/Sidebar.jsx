import React from 'react';

function Sidebar({ chats }) {
  return (
    <div className="sidebar container">
      {chats.length && chats.map((chat) => (
        <p>{chat.chat_id}</p>
      ))}
    </div>
  );
}

export default Sidebar;

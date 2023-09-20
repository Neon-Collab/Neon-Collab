import React from 'react';

function Sidebar({ chats, selectedProblem, handleClick }) {
  return (
    <div className='sidebar container'>
      <h1>Messages</h1>
      {chats.length &&
        chats.map((chat) =>
          chat.problem_id === selectedProblem ? (
            <div id={chat.chat_id} className='chat selected'>
              {chat.problem_id}
            </div>
          ) : (
            <div
              id={chat.chat_id}
              className='chat'
              onClick={(e) => handleClick(e.target.textContent, e.target.id)}
            >
              {chat.problem_id}
            </div>
          )
        )}
    </div>
  );
}

export default Sidebar;

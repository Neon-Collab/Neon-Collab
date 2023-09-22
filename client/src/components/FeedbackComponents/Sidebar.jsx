import React from "react";

function Sidebar({ chats, selectedProblem, handleClick, problems, messages }) {
  return (
    <div className="sidebar container">
      <h1>Messages</h1>
      {chats.length ? (
        chats.map((chat) =>
          chat.problem_id === selectedProblem ? (
            <div id={chat.chat_id} className="chat selected">
              {problems[chat.problem_id]}
            </div>
          ) : (
            <div
              id={chat.chat_id}
              className="chat"
              title={chat.problem_id}
              onClick={(e) => handleClick(e.target.title, e.target.id)}
            >
              {problems[chat.problem_id]}
            </div>
          )
        )
      ) : (
        <p>Come back friday to complete a code review</p>
      )}
    </div>
  );
}

export default Sidebar;

import React, { useState, useEffect } from "react";
import axios from "axios";

function ChatViewer({ messages, userId, chatId, setLoader }) {
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);

  const handleClick = () => {
    axios
      .post("/api/messages", {
        chatId,
        userId,
        message,
      })
      .then(setLoader((prev) => !prev));
  };

  useEffect(() => {
    axios
      .get("/api/users")
      .then((results) => {
        const userObj = {};
        results.data.forEach((user) => {
          userObj[user.user_id] = user.username;
        });
        return userObj;
      })
      .then((userObj) => setUsers(userObj));
  }, []);

  const handleChange = (value) => {
    setMessage(value);
  };

  return (
    <div className="common-container" style={{ flex: 2 }}>
      <div className="view-chat">
        {messages.map((message) => (
          <div className={message.user_id === userId ? "right" : "left"}>
            <p>{message.message}</p>
            <p className="username">{users[message.user_id]}</p>
          </div>
        ))}
      </div>
      <div className="send-chat">
        <input
          className="send-message"
          type="text"
          onChange={(e) => handleChange(e.target.value)}
        />
        <button className="send-chat-btn" type="button" onClick={handleClick}>
          SEND
        </button>
      </div>
    </div>
  );
}

export default ChatViewer;

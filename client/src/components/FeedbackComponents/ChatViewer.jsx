import React from 'react';

function ChatViewer() {
  return (
    <div className="chat-viewer container">
      <div className="view-chat">
        <p>Message example</p>
      </div>
      <div className="send-chat">
        <input type="text" />
        <button type="submit">SEND</button>
      </div>
    </div>
  );
}

export default ChatViewer;

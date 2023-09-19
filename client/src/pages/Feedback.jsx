import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ChatViewer from '../components/FeedbackComponents/ChatViewer.jsx';
import Sidebar from '../components/FeedbackComponents/Sidebar.jsx';
import UserSolution from '../components/FeedbackComponents/UserSolution.jsx';

function Feedback() {
  const [chats, setChats] = useState([]);
  useEffect(() => {
    axios.get('/feedback', {
      params: {
        id: 1, // this will be the current user's id
      },
    })
      .then((results) => setChats(results.data));
  }, []);
  return (
    <div className="feedback-container">
      <Sidebar chats={chats} />
      <UserSolution />
      <ChatViewer />
    </div>
  );
}

export default Feedback;

// import React from 'react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ChatViewer from '../components/FeedbackComponents/ChatViewer.jsx';
import Sidebar from '../components/FeedbackComponents/Sidebar.jsx';
import UserSolution from '../components/FeedbackComponents/UserSolution.jsx';

function Feedback() {
  const [chats, setChats] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState('');
  const [chatId, setChatId] = useState(8);
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState(1);

  const setChatsAndSelected = (chatsPromise) => {
    setChats(chatsPromise);
    setSelectedProblem(chatsPromise[0].problem_id);
    setChatId(chatsPromise[0].chat_id);
  };

  useEffect(() => {
    axios
      .get('/api/feedback', {
        params: {
          id: 1 // this will be the current user's id
        }
      })
      .then((results) => setChatsAndSelected(results.data));
  }, []);

  useEffect(() => {
    axios
      .get('/api/submissions', {
        params: {
          id: 1 // this will be the current user's id
        }
      })
      .then((results) => setSubmissions(results.data));
  }, []);

  useEffect(() => {
    axios
      .get('/api/messages', {
        params: {
          chatId
        }
      })
      .then((results) => setMessages(results.data));
  }, [chatId]);

  const handleClick = (problemId, chatId) => {
    setSelectedProblem(Math.round(problemId));
    setChatId(Math.round(chatId));
  };

  console.log(chatId);

  return (
    <div className='feedback-container'>
      <Sidebar chats={chats} selectedProblem={selectedProblem} handleClick={handleClick} />
      <UserSolution submissions={submissions} selectedProblem={selectedProblem} />
      <ChatViewer messages={messages} userId={userId} />
    </div>
  );
}

export default Feedback;

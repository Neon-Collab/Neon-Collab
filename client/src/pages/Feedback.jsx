// import React from 'react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import FeedbackForm from '../components/FeedbackComponents/FeedbackForm.jsx';
import ChatViewer from '../components/FeedbackComponents/ChatViewer.jsx';
import Sidebar from '../components/FeedbackComponents/Sidebar.jsx';
import UserSolution from '../components/FeedbackComponents/UserSolution.jsx';

function Feedback() {
  const [chats, setChats] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState('');
  const [chatId, setChatId] = useState(0);
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState(1); // this will be set to current user's id
  const [modalVisibility, setModalVisibility] = useState(false);
  const [problems, setProblems] = useState([]);
  const [loader, setLoader] = useState(true);

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
  }, [chatId, loader]);

  useEffect(() => {
    axios
      .get('/api/problems')
      .then((results) => {
        const problemObj = {};
        results.data.forEach((obj) => {
          problemObj[obj.problem_id] = obj.problem_name;
        });
        return problemObj;
      })
      .then((problemObj) => setProblems(problemObj));
  }, []);

  const handleClick = (problemId, chatId) => {
    setSelectedProblem(Math.round(problemId));
    setChatId(Math.round(chatId));
  };

  const closeModal = () => {
    setModalVisibility(false);
  };

  return (
    <div className='feedback-container'>
      {modalVisibility && <FeedbackForm closeModal={closeModal} />}
      <Sidebar
        chats={chats}
        selectedProblem={selectedProblem}
        handleClick={handleClick}
        problems={problems}
      />
      <UserSolution submissions={submissions} selectedProblem={selectedProblem} />
      <ChatViewer messages={messages} userId={userId} chatId={chatId} setLoader={setLoader} />
    </div>
  );
}

export default Feedback;

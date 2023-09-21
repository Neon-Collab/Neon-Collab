// import React from 'react';
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import FeedbackForm from "../components/FeedbackComponents/FeedbackForm.jsx";
import ChatViewer from "../components/FeedbackComponents/ChatViewer.jsx";
import Sidebar from "../components/FeedbackComponents/Sidebar.jsx";
import UserSolution from "../components/FeedbackComponents/UserSolution.jsx";
import WeekendContext from "../contexts/WeekendContext.jsx";

function Feedback() {
  const [chats, setChats] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState("");
  const [chatId, setChatId] = useState(0);
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState(1); // this will be set to current user's id
  const [problems, setProblems] = useState([]);
  const [loader, setLoader] = useState(true);
  const [problemId, setProblemId] = useState(1);
  const [queryOfSubmissions, setQueryOfSubmissions] = useState(0);
  const [postedSubmissions, setPostedSubmissions] = useState(0);
  const [modal, setModal] = useState(true);
  const { weekend } = useContext(WeekendContext);

  const toggleVisibility = () => {
    setModal(false);
  };

  const setChatsAndSelected = (chatsPromise) => {
    setChats(chatsPromise);
    setSelectedProblem(chatsPromise[0].problem_id);
    setChatId(chatsPromise[0].chat_id);
  };

  const setQueryAndSubmissions = (submissionsPromise) => {
    setSubmissions(submissionsPromise);
    setQueryOfSubmissions(submissionsPromise.length);
  };

  useEffect(() => {
    axios
      .get("/api/chats", {
        params: {
          id: 1, // this will be the current user's id
        },
      })
      .then((results) => setChatsAndSelected(results.data));
  }, [weekend]);

  useEffect(() => {
    axios
      .get("/api/submissions", {
        params: {
          id: 1,
        },
      })
      .then((results) => setProblemId(results.data[0].problem_id));
  }, []);

  useEffect(() => {
    axios
      .get("/api/submission")
      .then((results) => setQueryAndSubmissions(results.data));
  }, [weekend]);

  useEffect(() => {
    axios
      .get("/api/messages", {
        params: {
          chatId,
        },
      })
      .then((results) => setMessages(results.data));
  }, [chatId, loader, modal]);

  useEffect(() => {
    axios
      .get("/api/problems")
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

  const createPairs = (solutions) => {
    const resultsArr = [];
    const problemsArr = [];
    for (let i = 1; i <= 4; i++) {
      problemsArr.push(solutions.filter((obj) => obj.problem_id === i));
    }
    problemsArr.map((innerArr) => {
      innerArr.sort((a, b) => a.score - b.score);
    });
    problemsArr.forEach((innerArr) => {
      if (innerArr) {
        while (innerArr.length >= 1) {
          resultsArr.push([innerArr.pop(), innerArr.shift()]);
        }
      }
    });
    resultsArr.forEach((pair) => {
      axios.post("/api/chats/", {
        problem_id: pair[0].problem_id,
        solver_id: pair[0].user_id,
        reviewer_id: pair[1].user_id,
      });
    });
  };

  useEffect(() => {
    axios
      .get("/api/chat")
      .then((results) => setPostedSubmissions(results.data.length * 2));
  }, [weekend]);

  if (weekend) {
    if (queryOfSubmissions > postedSubmissions) {
      createPairs(submissions);
    } else {
      console.log("nothing to post");
    }
  }

  console.log(queryOfSubmissions);
  console.log(postedSubmissions);

  return (
    <div className="feedback-container">
      {weekend && modal && (
        <FeedbackForm
          chatId={chatId}
          chats={chats}
          userId={userId}
          toggleVisibility={toggleVisibility}
        />
      )}
      <Sidebar
        chats={chats}
        selectedProblem={selectedProblem}
        handleClick={handleClick}
        problems={problems}
      />
      <UserSolution
        submissions={submissions}
        selectedProblem={selectedProblem}
      />
      <ChatViewer
        messages={messages}
        userId={userId}
        chatId={chatId}
        setLoader={setLoader}
      />
    </div>
  );
}

export default Feedback;

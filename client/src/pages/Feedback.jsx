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
  const [userId, setUserId] = useState(6); // this will be set to current user's id
  const [problems, setProblems] = useState([]);
  const [loader, setLoader] = useState(true);
  const [problemId, setProblemId] = useState(1);
  const [queryOfSubmissions, setQueryOfSubmissions] = useState(0);
  const [postedSubmissions, setPostedSubmissions] = useState(0);
  const [modal, setModal] = useState(true);
  const { weekend } = useContext(WeekendContext);

  const render = () => {
    setLoader((prev) => !prev);
  };

  const toggleVisibility = () => {
    setModal(false);
  };

  useEffect(() => {
    axios.get("/users");
  });

  const setChatsAndSelected = (chatsPromise) => {
    setChats(chatsPromise);
    setSelectedProblem(chatsPromise[chatsPromise.length - 1].problem_id);
    setChatId(chatsPromise[chatsPromise.length - 1].chat_id);
  };

  const setQueryAndSubmissions = (submissionsPromise) => {
    setSubmissions(submissionsPromise);
    setQueryOfSubmissions(submissionsPromise.length);
  };

  useEffect(() => {
    if (weekend) {
      if (queryOfSubmissions > postedSubmissions) {
        createPairs(submissions.slice(postedSubmissions));
      } else {
        console.log("nothing to post");
      }
    }
  }, [weekend]);

  useEffect(() => {
    axios
      .get("/api/chats", {
        params: {
          id: userId,
        },
      })
      .then((results) => setChatsAndSelected(results.data));
  }, [weekend]);

  useEffect(() => {
    axios
      .get("/api/submissions", {
        params: {
          id: userId,
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
    if (messages.length) {
      setModal(false);
    }
  }, [messages]);

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

  return (
    <div className="feedback-container">
      {weekend && modal && (
        <FeedbackForm
          chatId={chatId}
          userId={userId}
          toggleVisibility={toggleVisibility}
          problemId={problemId}
        />
      )}
      <Sidebar
        chats={chats}
        selectedProblem={selectedProblem}
        handleClick={handleClick}
        problems={problems}
        messages={messages}
      />
      <UserSolution
        submissions={submissions}
        selectedProblem={selectedProblem}
        userId={userId}
      />
      <ChatViewer
        messages={messages}
        userId={userId}
        chatId={chatId}
        render={render}
      />
    </div>
  );
}

export default Feedback;

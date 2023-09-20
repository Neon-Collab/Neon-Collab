import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ProblemHistory() {
  const [userID, setUserID] = useState(27);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios.get(`/api/submissions_all/user/${userID}`)
      .then((response) => {
        console.log(response.data);
        setHistory(response.data);
      });
  }, []);

  return (
    <div className="component-container">
      <h1>Problem History</h1>
      <div className="history-container">
        {/*Create a problem history chart with percentages */}
      </div>
    </div>
  );
}

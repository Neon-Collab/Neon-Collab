import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ProblemHistory() {
  const [userID, setUserID] = useState(27);
  const [history, setHistory] = useState(null);

  useEffect(() => {
    axios.get(`/api/submissions_all/user/${userID}`)
      .then((response) => {
        setHistory(response.data);
      });
  }, []);

  console.log(history)

  return (
    <div className="component-container">
      <h1>Problem History</h1>
      <div className="history-container">
        {history ? (
          <table>
            <tr>
              <th>Problem Name</th>
              <th>Percent</th>
            </tr>
            {history.map((problem, i) => (
              <tr key={i}>
                <td>Problem {problem.id}</td>
                <td>{problem.score}%</td>
              </tr>
            ))}
          </table>
        ) : <span>You have not attempted any problems</span>}
      </div>
    </div>
  );
}

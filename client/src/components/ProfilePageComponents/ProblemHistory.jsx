import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ProblemHistory({ id }) {
  const [userID, setUserID] = useState(27);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios.get(`/api/submissions_all/user/${id}`)
      .then((response) => {
        setHistory(response.data);
      });
  }, []);

  // console.log(history)

  return (
    <div className="common-container component-container">
      <h2>Problem History</h2>
      <div className="history-container">
        {history.length > 0 ? (
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

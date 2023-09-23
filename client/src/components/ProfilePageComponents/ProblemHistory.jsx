import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

export default function ProblemHistory({ id }) {
  const [userID, setUserID] = useState(27);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios.get(`/api/submissions_all/user/${id}`)
      .then((response) => {
        setHistory(response.data);
      });
  }, []);

  return (
    <div className="common-container component-container">
      <h2>Problem History</h2>
      <div className="history-container">
        {history.length > 0 ? (
          <table className="history-table">
            <tr>
              <th>Problem Name</th>
              <th>Percent</th>
            </tr>
            {history.map((problem, i) => (
              <tr key={i}>
                <td>{problem.problem_name}</td>
                <td>{problem.score * 100}% {problem.score === 1 && <TaskAltIcon style={{ color: 'magenta', fontSize: 30, marginLeft: '25px' }}/>}</td>
              </tr>
            ))}
          </table>
        ) : <span>You have not attempted any problems</span>}
      </div>
    </div>
  );
}

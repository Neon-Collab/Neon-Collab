import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    axios.get('/api/rank/')
      .then((response) => {
        setLeaderboardData(response.data);
      })
      .catch((error)=> {
        console.error(error);
      });
  }, []);

  return (
    <div className="common-container">
      <h2>Leaderboard</h2>
      <table className="rank-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>User ID</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((user) => (
            <tr key={user.user_id}>
              <td>{user.rank}</td>
              <td>{user.user_id}</td>
              <td>{(Number(user.total_score) * 100).toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;

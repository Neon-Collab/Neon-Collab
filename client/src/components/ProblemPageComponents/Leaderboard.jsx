import React, { useState, useEffect } from 'react';
import axios from 'axios';

const tableStyles = {
  border: '1px solid black',
  width: '80%',
  margin: '0 auto',
  borderCollapse: 'collapse',
  textAlign: 'center',
};

const thTdStyles = {
  border: '1px solid black',
  padding: '8px',
  textAlign: 'center',
};

function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    axios.get('/api/rank/')
      .then((response) => {
        setLeaderboardData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="common-container">
      <h2 style={{ color: 'magenta', textAlign: 'center' }}>Leaderboard</h2>
      <table className="rank-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>User Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((user) => (
            <tr key={user.user_id}>
              <td>{user.rank}</td>
              <td>{user.username}</td>
              <td>{(Number(user.total_score) * 100)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Leaderboard;

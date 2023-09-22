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
      //  I also created table styles - feel free to try them or keep yours!
      // <table className="rank-table">
      <h2 style={{ color: 'magenta', textAlign: 'center' }}>Leaderboard</h2>
      <table style={tableStyles}>
        <thead>
          <tr>
            <th style={thTdStyles}>Rank</th>
            <th style={thTdStyles}>User ID</th>
            <th style={thTdStyles}>Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((user) => (
            <tr key={user.user_id}>
              <td style={thTdStyles}>{user.rank}</td>
              <td style={thTdStyles}>{user.user_id}</td>
              <td style={thTdStyles}>{(Number(user.total_score) * 100).toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Leaderboard;

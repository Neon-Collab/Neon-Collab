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

function RankingbyProblem({ problemId }) {
  const [rankings, setRankings] = useState([]);
  const [problemName, setProblemName] = useState('');

  useEffect(() => {
    if (problemId) {
      axios.get(`/api/submissions/${problemId}`)
        .then((response) => {
          const sortedRankings = response.data.sort((a, b) => b.score - a.score);
          setRankings(sortedRankings);
          // setRankings(sortedRankings.slice(0, 20));
        })
        .catch((error) => {
          console.error('Error fetching rankings:', error);
        });

      axios.get(`/api/problems/${problemId}`)
        .then((response) => {
          setProblemName(response.data.problem_name);
        })
        .catch((error) => {
          console.error('Error fetching problem details:', error);
        });
    }
  }, [problemId]);

  return (
    <div className="common-container">
      <h2 style={{ color: 'magenta', textAlign: 'center' }}>Ranking for Problem: {problemName}</h2>
      <table className="rank-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>User ID</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {rankings.map((rank, index) => (
            <tr key={rank.user_id}>
              <td>{index + 1}</td>
              <td>{rank.user_id}</td>
              <td>{(Number(rank.score) * 100).toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RankingbyProblem;

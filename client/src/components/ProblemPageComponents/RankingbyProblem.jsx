import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RankingbyProblem({ problemId }) {
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    if (problemId) {
      axios.get(`/api/submissions/${problemId}`)
        .then((response) => {
          const sortedRankings = response.data.sort((a, b) => b.score - a.score);
          setRankings(sortedRankings);
          setRankings(sortedRankings.slice(0, 20));
        })
        .catch((error) => {
          console.error('Error fetching rankings:', error);
        });
    }
  }, [problemId]);

  return (
    <div>
      <h2>Ranking for Problem {problemId}</h2>
      <table>
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
              <td>{rank.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RankingbyProblem;

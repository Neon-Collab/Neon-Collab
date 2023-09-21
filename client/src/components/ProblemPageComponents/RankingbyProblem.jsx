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
      <h2>Rankings for Problem {problemId}</h2>
      {rankings.map((rank, index) => (
        <div key={rank.user_id}>
          {index + 1}. User {rank.user_id} - Score: {rank.score}
        </div>
      ))}
    </div>
  );
}

export default RankingbyProblem;

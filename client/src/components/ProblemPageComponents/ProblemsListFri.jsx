import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProblemsListFri() {
  const [problems, setProblems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/problemsWithScores')
      .then((response) => {
        setProblems(response.data);
      })
      .catch((error) => {
        console.error('Error fetching problems with scores:', error);
        setError('Failed to fetch problems. Please try again later.');
      });
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="common-container">
      {problems.map((problem) => (
        <div key={problem.problem_id} style={{ marginBottom: '20px' }}>
          <h2>{problem.problem_name}</h2>
          <p>{problem.description}</p>
          <p>
            Average Score: { Number(problem.averagescore).toFixed(2) }
          </p>
        </div>
      ))}
    </div>
  );
}

export default ProblemsListFri;

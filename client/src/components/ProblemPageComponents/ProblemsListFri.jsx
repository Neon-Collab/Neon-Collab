import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProblemsListFri() {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    axios.get('/problemsWithScores')
      .then((response) => {
        setProblems(response.data);
      })
      .catch((error) => {
        console.error('Error fetching problems with scores:', error);
      });
  }, []);

  return (
    <div>
      {problems.map((problem) => (
        <div key={problem.problem_id} style={{ marginBottom: '20px' }}>
          <h2>{problem.problem_name}</h2>
          <p>{problem.description}</p>
          <p>
            Average Score: {problem.averageScore}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ProblemsListFri;

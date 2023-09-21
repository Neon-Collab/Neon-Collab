import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProblemsListFri() {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    // fetch the same four problems as in Mon-Thu view
    const firstFourProblemIds = JSON.parse(localStorage.getItem('firstFourProblemIds') || '[]');
    axios.get('/api/problemsWithScores')
      .then((response) => {
        const relevantProblems = response.data.filter(problem => firstFourProblemIds.includes(problem.problem_id));
        setProblems(relevantProblems);
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
            Average Score: { Number(problem.averagescore).toFixed(2) }
          </p>
        </div>
      ))}
    </div>
  );
}

export default ProblemsListFri;

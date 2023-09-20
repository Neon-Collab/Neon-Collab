import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ProblemsList() {
  const [problems, setProblems] = useState([]);
  const [selectedProblemId, setSelectedProblemId] = useState(null);
  const navigate = useNavigate();

  const handleSelectProblem = (problemId) => {
    setSelectedProblemId(problemId);
    navigate(`/editor/${problemId}`);
  };

  useEffect(() => {
    axios
      .get('/api/problems')
      .then((response) => {
        setProblems(response.data);
      })
      .catch((error) => {
        console.error('Error fetching problems:', error);
      });
  }, []);

  return (
    <div>
      {problems.map((problem) => (
        <div key={problem.problem_id} style={{ marginBottom: '20px' }}>
          <h2>{problem.problem_name}</h2>
          <p>{problem.description}</p>
          {selectedProblemId === problem.problem_id && <span>✔️</span>}
          <button type='button' onClick={() => handleSelectProblem(problem.problem_id)}>
            Select Problem
          </button>
        </div>
      ))}
    </div>
  );
}

export default ProblemsList;

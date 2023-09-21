import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

function ProblemsList({ selectedProblemId, setSelectedProblemId }) {
  const [problems, setProblems] = useState([]);

  const navigate = useNavigate();

  const handleSelectProblem = (problemId) => {
    setSelectedProblemId(problemId);
    localStorage.setItem('selectedProblemId', problemId);
    navigate(`/editor/${problemId}`);
  };

  useEffect(() => {
    // load selected problem id from local storage on component mount
    const storedSelectedProblemId = localStorage.getItem('selectedProblemId');
    if (storedSelectedProblemId) {
      setSelectedProblemId(storedSelectedProblemId);
    }

    axios.get('/api/problems')
      .then((response) => {
        const firstFourProblems = response.data.slice(0, 4);
        setProblems(firstFourProblems);
        const firstFourProblemIds = firstFourProblems.map((p) => p.problem_id);
        localStorage.setItem('firstFourProblemIds', JSON.stringify(firstFourProblemIds));
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
          <h3>{problem.difficulty}</h3>
          <p>{problem.description}</p>
          {/* use loose equal, problem_id is num, selectedProblemId is string */}
          {selectedProblemId == problem.problem_id && <TaskAltIcon style={{ color: 'red', fontSize: 50 }} />}
          <button type="button" onClick={() => handleSelectProblem(problem.problem_id)}>
            Select Problem
          </button>
        </div>
      ))}
    </div>
  );
}

export default ProblemsList;

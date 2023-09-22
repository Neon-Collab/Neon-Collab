import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

function ProblemsList({ selectedProblemId, setSelectedProblemId, userId }) {
  const [problems, setProblems] = useState([]);

  const navigate = useNavigate();

  const savePreferenceForUser = (userId, key, value) => {
    const userData = JSON.parse(localStorage.getItem('userData')) || {};
    if (userData[userId]) {
      userData[userId][key] = value;
    } else {
      userData[userId] = { [key]: value };
    }
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  const getPreferenceForUser = (userId, key) => {
    const userData = JSON.parse(localStorage.getItem('userData')) || {};
    return userData[userId] ? userData[userId][key] : null;
  };

  const handleSelectProblem = (problemId) => {
    setSelectedProblemId(problemId);
    savePreferenceForUser(userId, 'selectedProblemId', problemId);
    navigate(`/editor/${problemId}`);
  };

  useEffect(() => {
    const storedSelectedProblemId = getPreferenceForUser(userId, 'selectedProblemId');
    if (storedSelectedProblemId) {
      setSelectedProblemId(storedSelectedProblemId);
    }

    axios.get('/api/problems')
      .then((response) => {
        const firstFourProblems = response.data.slice(0, 4);
        setProblems(firstFourProblems);
      })
      .catch((error) => {
        console.error('Error fetching problems:', error);
      });
  }, [userId]);

  return (
    <div className="common-container">
      {problems.map((problem) => (
        <div key={problem.problem_id} style={{ marginBottom: '20px' }}>
          <h2 style={{ color: 'magenta' }}>{problem.problem_name}</h2>
          <h3>{problem.difficulty}</h3>
          <p style={{ color: 'white' }}>{problem.description}</p>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button type="button" onClick={() => handleSelectProblem(problem.problem_id)}>
              Select Problem
            </button>
            {selectedProblemId == problem.problem_id && <TaskAltIcon style={{ color: 'magenta', fontSize: 50, marginLeft: '10px' }} />}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProblemsList;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SelectedProblem({ problemId }) {
  const [problem, setProblem] = useState(null);

  useEffect(() => {
    if (problemId) {
      axios.get(`/problems/${problemId}`)
        .then((res) => {
          setProblem(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [problemId]);

  if (!problem) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{problem.problem_name}</h1>
      <p>{problem.description}</p>
      <p>{problem.difficulty}</p>
    </div>
  );
}


export default SelectedProblem;

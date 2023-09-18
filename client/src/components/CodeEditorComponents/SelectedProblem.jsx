import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SelectedProblem() {
  const [problem, setProblem] = useState(null);

  useEffect(() => {
    // Testing
    const problemId = 1;

    axios.get(`/problems/${problemId}`)
      .then((res) => {
        setProblem(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
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

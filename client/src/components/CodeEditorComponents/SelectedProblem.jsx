import React, { useState, useEffect } from 'react';
import axios from 'axios';


function SelectedProblem({ problem }) {
  if (!problem) {
    return <p>Loading...</p>;
  }

  return (
    <div className="common-container">
      <h2>{problem.problem_name}</h2>
      <p>{problem.description}</p>
      <p>{problem.difficulty}</p>
    </div>
  );
}
export default SelectedProblem;

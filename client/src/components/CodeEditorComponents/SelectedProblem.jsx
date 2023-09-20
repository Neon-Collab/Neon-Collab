import React, { useState, useEffect } from 'react';
import axios from 'axios';


function SelectedProblem({ problem }) {
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

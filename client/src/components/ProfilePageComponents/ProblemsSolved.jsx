import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ProblemsSolved({ id }) {
  // const [userID, setUserID] = useState(27);
  const [solved, setSolved] = useState(0);

  useEffect(() => {
    axios.get(`/api/submissions/user/${id}`)
      .then((response) => {
        setSolved(response.data.length);
      });
  }, []);
  return (
    <div className="component-container">
      <h1>Problems Solved</h1>
      <h2>{solved}</h2>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ProblemsSolved({ id }) {
  const [userID, setUserID] = useState(27);
  const [solved, setSolved] = useState(0);

  useEffect(() => {
    axios.get(`/api/submissions/user/${id}`)
      .then((response) => {
        setSolved(response.data.length);
      });
  }, []);
  return (
    <div className="common-container component-container">
      <h2>Problems Solved</h2>
      <h3>{solved}</h3>
    </div>
  );
}

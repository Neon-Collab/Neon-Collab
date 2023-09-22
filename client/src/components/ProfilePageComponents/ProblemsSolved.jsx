import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ProblemsSolved({ id }) {
  const [solved, setSolved] = useState(0);

  useEffect(() => {
    axios.get(`/api/submissions/user/${id}`)
      .then((response) => {
        setSolved(response.data.length);
      });
  }, []);
  return (
    <div className="common-container component-container">
      <h2>Problems Submitted</h2>
      <h3>{solved}</h3>
    </div>
  );
}

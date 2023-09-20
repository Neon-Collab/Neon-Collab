import React from 'react';
import axios from 'axios';

function CodeSubmit({ userId, problemId, code }) {
  const submitCode = () => {
    if (window.confirm('Would you like to submit your code?')) {
      axios.post('/api/codeEditor/submit', {
        userId,
        problemId,
        code,
      })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          if (err.response.status === 409) {
            alert('You have already submitted the solution code for this problem.');
          } else {
            console.error(err);
          }
        });
    } else {
      console.log('Code submission canceled.');
    }
  };

  return (
    <div>
      <button type="button" onClick={submitCode}>Submit</button>
    </div>
  );
}

export default CodeSubmit;

import React from 'react';

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
          console.error(err);
        });
    } else {
      console.log('Code submission canceled.');
    }
  };


  return <button type="button" onClick={submitCode}>Submit</button>;
}

export default CodeSubmit;
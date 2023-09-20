import React from 'react';
import axios from 'axios';

function RunCode({ userId, problemId, code, setConsoleOutput }) {
  const executeCode = () => {
    if (window.confirm('Would you like to run your code?')) {
      axios.post('/api/codeEditor/runCode', {
        userId,
        problemId,
        code,
      })
        .then((res) => {
          setConsoleOutput(res.data.consoleOutput);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      console.log('Code execution canceled.');
    }
  };

  return <button type="button" onClick={executeCode}>Run Code</button>;
}

export default RunCode;

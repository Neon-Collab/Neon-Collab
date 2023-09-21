import React, { useState } from 'react';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

function RunCode({ userId, problemId, code, setConsoleOutput }) {
  const [isLoading, setIsLoading] = useState(false);
  const executeCode = () => {
    if (window.confirm('Would you like to run your code?')) {
      setIsLoading(true);
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
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      console.log('Code execution canceled.');
    }
  };

  return (
    <div>
      <button type="button" onClick={executeCode}>Run Code</button>
      {isLoading && <CircularProgress />}
    </div>
  )
}

export default RunCode;

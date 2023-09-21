import React, { useState } from 'react';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function CodeSubmit({ userId, problemId, code }) {
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const submitCode = () => {
    if (window.confirm('Would you like to submit your code?')) {
      setAlertMessage('Code submitted successfully!');
      setAlertSeverity('success');
      setOpen(true);
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
            setAlertMessage('You have already submitted the solution code for this problem.');
            setAlertSeverity('error');
            setOpen(true);
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
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertSeverity} variant="filled">
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default CodeSubmit;

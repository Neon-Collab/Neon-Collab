import React from 'react';
import Paper from '@mui/material/Paper';

function EditorConsole({ output }) {
  return (
    <Paper elevation={3} style={consoleStyle}>
      <p>Output: </p>
      <div>{output}</div>
    </Paper>
  );
}

const consoleStyle = {
  backgroundColor: '#333',
  color: 'white',
  padding: '15px',
  minHeight: '100px',
  marginTop: '15px',
  borderRadius: '4px',
};

export default EditorConsole;

import React from 'react';

function EditorConsole({ output }) {
  return (
    <div style={consoleStyle}>
      <p>Output: </p>
      {output}
    </div>
  );
}

const consoleStyle = {
  color: 'white',
  padding: '10px',
  height: '100px',
  border: '1px solid grey',
  marginTop: '10px',
};
export default EditorConsole;

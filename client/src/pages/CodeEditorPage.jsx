import React, { useState } from 'react';
import axios from 'axios';
import CodeEditor from '../components/CodeEditorComponents/CodeEditor.jsx';
import SelectedProblem from '../components/CodeEditorComponents/SelectedProblem.jsx';

function CodeEditorPage() {
  const [code, setCode] = useState('// Write your JavaScript code here...');
  const submitCode = () => {
    if (window.confirm('Would you like to submit your code?')) {
      // For testing only
      const userId = 1;
      const problemId = 1;

      axios.post('/codeEditor/submit', {
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
  return (
    <div>
      <div style={containerStyle}>
        <div style={problemStyle}>
          <SelectedProblem />
        </div>
        <div>
          <CodeEditor value={code} onChange={setCode} />
          <button type="button" onClick={submitCode}>Submit</button>
        </div>
      </div>
    </div>
  );
}
const containerStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
};

const problemStyle = {
  marginRight: '20px',
};

export default CodeEditorPage;

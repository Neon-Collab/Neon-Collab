import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CodeEditor from '../components/CodeEditorComponents/CodeEditor.jsx';
import SelectedProblem from '../components/CodeEditorComponents/SelectedProblem.jsx';

function CodeEditorPage({ setSelectedProblemId }) {
  const [code, setCode] = useState('// Write your JavaScript code here...');
  const { problemId } = useParams();

  useEffect(() => {
    if (setSelectedProblemId) {
      setSelectedProblemId(problemId);
    }
  }, [problemId, setSelectedProblemId]);

  const submitCode = () => {
    if (window.confirm('Would you like to submit your code?')) {
      // For testing only
      const userId = 1;
      // const problemId = 1;

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
          <SelectedProblem problemId={problemId} />
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

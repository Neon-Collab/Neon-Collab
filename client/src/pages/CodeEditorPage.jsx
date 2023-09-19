import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CodeEditor from '../components/CodeEditorComponents/CodeEditor.jsx';
import SelectedProblem from '../components/CodeEditorComponents/SelectedProblem.jsx';

function CodeEditorPage() {
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState('Loading...');
  useEffect(() => {
    const problemId = 2;
    axios.get(`/problems/${problemId}`)
      .then((res) => {
        setProblem(res.data);
        const signature = `function ${res.data.problem_function_name}() {\n  // write your code here\n}`;
        setCode(signature);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const submitCode = () => {
    if (window.confirm('Would you like to submit your code?')) {
      // For testing only
      const userId = 45;
      const problemId = 2;

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
        <SelectedProblem problem={problem} />
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

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CodeEditor from '../components/CodeEditorComponents/CodeEditor.jsx';
import SelectedProblem from '../components/CodeEditorComponents/SelectedProblem.jsx';

function CodeEditorPage({ setSelectedProblemId }) {
  const [code, setCode] = useState('// Write your JavaScript code here...');
  const { problemId } = useParams();
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState('Loading...');
  useEffect(() => {
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
  useEffect(() => {
    if (setSelectedProblemId) {
      setSelectedProblemId(problemId);
    }
  }, [problemId, setSelectedProblemId]);

  const submitCode = () => {
    if (window.confirm('Would you like to submit your code?')) {

      const userId = 1;
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

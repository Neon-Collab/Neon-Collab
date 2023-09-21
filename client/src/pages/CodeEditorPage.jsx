import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AppContext from '../contexts/AppContext.jsx';
import CodeEditor from '../components/CodeEditorComponents/CodeEditor.jsx';
import SelectedProblem from '../components/CodeEditorComponents/SelectedProblem.jsx';
import CodeSubmit from '../components/CodeEditorComponents/CodeSubmit.jsx';
import EditorConsole from '../components/CodeEditorComponents/EditorConsole.jsx';
import RunCode from '../components/CodeEditorComponents/RunCode.jsx';

function CodeEditorPage() {
  const { problemId } = useParams();
  const context = React.useContext(AppContext);
  const { username } = context.account;
  const [problem, setProblem] = useState(null);
  const [userId, setUserId] = useState(null);
  const storagedCode = localStorage.getItem(`editor-${problemId}`);
  const [code, setCode] = useState(storagedCode || 'Loading...');
  const [consoleOutput, setConsoleOutput] = useState('');

  useEffect(() => {
    axios.get(`/api/getUserId/${username}`)
      .then((res) => {
        setUserId(res.data.userId);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [username]);

  useEffect(() => {
    axios.get(`/api/problems/${problemId}`)
      .then((res) => {
        setProblem(res.data);
        if (!storagedCode) {
          const signature = `function ${res.data.problem_function_name}() {\n  // write your code here\n}`;
          setCode(signature);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [problemId]);
  // Update the localStorage whenever the code changes
  useEffect(() => {
    localStorage.setItem(`editor-${problemId}`, code);
  }, [code, problemId]);


  return (
    <div>
      <div style={containerStyle}>
        <div style={problemStyle}>
          <SelectedProblem problem={problem} />
        </div>
        <div>
          <CodeEditor value={code} onChange={setCode} />
          <div style={buttonsStyle}>
            <CodeSubmit
              code={code}
              problemId={problemId}
              userId={userId}
            />
            <RunCode
              code={code}
              problemId={problemId}
              userId={userId}
              setConsoleOutput={setConsoleOutput}
            />
          </div>
          <EditorConsole output={consoleOutput} />
        </div>
      </div>
    </div>
  );
}
const containerStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'flex-start',
  color: 'white',
};

const problemStyle = {
  marginRight: '20px',
  maxWidth: '40%',
};

const buttonsStyle = {
  display: 'flex',
  flexDirection: 'row',
}

export default CodeEditorPage;

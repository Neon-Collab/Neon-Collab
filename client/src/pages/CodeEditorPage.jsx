import React, { useState } from 'react';
import CodeEditor from '../components/CodeEditorComponents/CodeEditor.jsx';
import SelectedProblem from '../components/CodeEditorComponents/SelectedProblem.jsx';

function CodeEditorPage() {
  const [code, setCode] = useState('');
  return (
    <div>
      <SelectedProblem />
      <CodeEditor value={code} onChange={setCode} />
      <button>Submit</button>
    </div>
  );
}

export default CodeEditorPage;

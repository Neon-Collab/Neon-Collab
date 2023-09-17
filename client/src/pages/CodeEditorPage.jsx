import React from 'react';
import CodeEditor from '../components/CodeEditorComponents/CodeEditor.jsx';
import SelectedProblem from '../components/CodeEditorComponents/SelectedProblem.jsx';

function CodeEditorPage() {
  return (
    <div>
      <SelectedProblem />
      <CodeEditor />
      <button>Submit</button>
    </div>
  );
}

export default CodeEditorPage;

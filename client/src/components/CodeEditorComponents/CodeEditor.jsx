import React from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
// Cyberpunk style
import 'ace-builds/src-noconflict/theme-monokai';

function CodeEditor({ value, onChange }) {

  return (
    <AceEditor
      mode="javascript"
      theme="monokai"
      onChange={onChange}
      value={value}
      name="neon_code_editor"
      highlightActiveLine
      editorProps={{ $blockScrolling: true }}
    />
  );
}

export default CodeEditor;

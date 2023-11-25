import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeEditorValue } from '../Utils/EditorSlice';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { aura } from '@uiw/codemirror-theme-aura';

import   '../editor.css';

export default function Editor() {
  const editorState = useSelector((state) => state.EditorState.value);
  const dispatch = useDispatch();

  const handleChange = (editor, data, value) => {
    dispatch(changeEditorValue(value));
  };

  return (
    <div className="editor-container">
      <CodeMirror id='editor'
        value={editorState}
        onInput={handleChange}
        height="40rem"
        theme={aura}
        extensions={[javascript({ jsx: true })]}
        
      />
    </div>
  );
}

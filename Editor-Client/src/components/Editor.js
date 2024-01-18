import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeEditorValue } from '../Utils/EditorSlice';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { aura } from '@uiw/codemirror-theme-aura';
import { useParams } from 'react-router-dom';
import './editor.css';

const Editor = ({ socketRef,roomId,onCodeChange }) => {
  const dispatch = useDispatch();
  const editorValue = useSelector((state) => state.EditorState.value);


const handleChange = (value) => {
  onCodeChange(value);
   socketRef.current.emit("CODE_CHANGE", {
    room:roomId,
    code:value,
});
dispatch(changeEditorValue(value));
  console.log('value', value);
};

// use effects


useEffect(() => {
  if (socketRef.current) {
      socketRef.current.on("CODE_CHANGE", ({ code }) => {
        console.log('from editor comp code change -> ',code);
          if (code !== null) {
            dispatch(changeEditorValue(code));
          }
      });
  }

  return () => {
      socketRef.current.off("CODE_CHANGE");
  };
}, [socketRef.current]);



  return (
    <div className="editor-container fon">
      <CodeMirror
        id='editor'
        value={editorValue}  // Use the editorValue from the Redux store
        onChange={handleChange}
        height='35rem'
        theme={aura}
        extensions={[javascript({ jsx: true })]}
      />
    </div>
  );
};

export default Editor;

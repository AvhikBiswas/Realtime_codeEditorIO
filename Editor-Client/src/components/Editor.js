import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeEditorValue } from '../Utils/EditorSlice';
import CodeMirror from '@uiw/react-codemirror';
import { cpp } from '@codemirror/lang-cpp'; // Import C++ language extension
import { aura } from '@uiw/codemirror-theme-aura';
import { useParams } from 'react-router-dom';
import './editor.css';


const Editor = ({ socketRef, roomId, onCodeChange,codeRef }) => {
  const dispatch = useDispatch();

  const editorValue = useSelector((state) => state.EditorState.value);
  codeRef.current=editorValue;


  const handleChange = (value) => {
    if (value !== editorValue) {
      
      codeRef.current = value;
      dispatch(changeEditorValue(value));
      socketRef.current.emit('CODE_CHANGE', {
        roomId,
        code: value,
      });
      onCodeChange(value);
    }
  };

  useEffect(() => {
    const codeChangeHandler = ({ code }) => {
      if (code !== null) {
        dispatch(changeEditorValue(code));
        codeRef.current = code;
        onCodeChange(code);
      }
    };
  
    if (socketRef.current) {
      socketRef.current.on('CODE_CHANGE', codeChangeHandler);
    }
  
    return () => {
      if (socketRef.current) {
        socketRef.current.off('CODE_CHANGE', codeChangeHandler);
      }
    };
  }, [socketRef.current]);
  

  return (
    <div className="editor-container fon">
      <CodeMirror
        id="editor"
        value={editorValue}
        onChange={handleChange}
        height="35rem"
        theme={aura}
        extensions={[cpp()]} 
      />
    </div>
  );
};

export default Editor;

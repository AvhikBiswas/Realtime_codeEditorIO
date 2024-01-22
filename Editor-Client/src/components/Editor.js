import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeEditorValue } from '../Utils/EditorSlice';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { aura } from '@uiw/codemirror-theme-aura';
import { useParams } from 'react-router-dom';
import './editor.css';

const Editor = ({ socketRef, roomId, onCodeChange }) => {
  const dispatch = useDispatch();
  const editorValue = useSelector((state) => state.EditorState.value);

  const handleChange = (value) => {
    dispatch(changeEditorValue(value));
    socketRef.current.emit('CODE_CHANGE', {
      roomId,
      code: value,
    });
    onCodeChange(value);
    console.log('value--->', value);
  };

  useEffect(() => {
    const codeChangeHandler = ({ code }) => {
      console.log('from editor comp code change -> ', code);
      if (code !== null) {
        onCodeChange(code);
        dispatch(changeEditorValue(code));
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
        extensions={[javascript({ jsx: true })]}
      />
    </div>
  );
};

export default Editor;

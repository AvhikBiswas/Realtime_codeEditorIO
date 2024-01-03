import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeEditorValue } from '../Utils/EditorSlice';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { aura } from '@uiw/codemirror-theme-aura';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';
import './editor.css';

const socket = io.connect('http://localhost:3030');

const Editor = () => {
  const { roomId } = useParams();
  console.log('params', roomId);

  const room = roomId; // Change to string as room identifier
  let editorState = useSelector((state) => state.EditorState.value);
  const dispatch = useDispatch();

  console.log('STATE IS ', editorState);

  useEffect(() => {
    const update = () => {
      socket.on('receive_update', (data) => {
        const { code } = data;
        dispatch(changeEditorValue(code));
      });
    };

    socket.emit('join_room', { room });
    update();

    return () => {
      // Cleanup: Remove the socket listener when component unmounts
      socket.off('receive_update');
    };
  }, [room, dispatch]); // Only include necessary dependencies

  const handleChange = (value) => {
    dispatch(changeEditorValue(value));
    socket.emit('update_code', { room, code: value });
    console.log('value', value);
  };

  return (
    <div className="editor-container fon">
      <CodeMirror
        id='editor'
        value={editorState}
        onChange={handleChange}
        height='35rem'
        theme={aura}
        extensions={[javascript({ jsx: true })]}
      />
    </div>
  );
};

export default Editor;

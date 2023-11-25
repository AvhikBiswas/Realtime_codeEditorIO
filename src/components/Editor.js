import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeEditorValue } from '../Utils/EditorSlice';

export default function Editor() {
  const editorState = useSelector((state) => state.EditorState.value);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const curr_value = e.target.value;
    dispatch(changeEditorValue(curr_value));
  };

  return (
    <div className="flex flex-grow bg-white rounded shadow p-4">
      <textarea
        className="w-full h-full resize-none outline-none border-none"
        id="editor"
        value={editorState} // assuming you want to display the current value in the textarea
        onChange={handleChange} // pass a reference to the function, not the result of calling it
      />
    </div>
  );
}

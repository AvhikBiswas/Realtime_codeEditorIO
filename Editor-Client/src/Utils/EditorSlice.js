import { createSlice } from "@reduxjs/toolkit";

const initialState = {
<<<<<<< HEAD
  value: `console.log()`,
=======
  value: "hi from redux",
>>>>>>> 77669763a06aaed1aa339f4b79f4307d0d3c5198
};
 
export const editorSlice = createSlice({
  name: "EditorState",
  initialState,
  reducers: {
    changeEditorValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { changeEditorValue } = editorSlice.actions;
export default editorSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: `console.log()`,
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

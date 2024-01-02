import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "hi from redux",
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

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: `#include <iostream>
  using namespace std;
  int main()
  {
    cout << "Hello World";
    return 0;
  }`,
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

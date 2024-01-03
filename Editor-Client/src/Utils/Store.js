import {configureStore} from '@reduxjs/toolkit';
import EditorReducer from './EditorSlice';



export const Store = configureStore({
    reducer:{
        EditorState:EditorReducer,
       
    },
})
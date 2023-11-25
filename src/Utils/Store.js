import {configureStore} from '@reduxjs/toolkit';
import EditorReducer from '../Utils/EditorSlice';



export const Store = configureStore({
    reducer:{
        EditorState:EditorReducer,
       
    },
})
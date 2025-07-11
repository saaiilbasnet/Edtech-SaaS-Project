


// collect all slices and store 

import { configureStore } from "@reduxjs/toolkit";
import authSlice from './auth/authSlice'
import teacherSlice from './teacher/teacherSlice'
import instituteSlice from './institute/instituteSlice'

const store = configureStore({
    reducer : {
        auth : authSlice, 
        teacher : teacherSlice, 
        institute : instituteSlice
    }
})



export default store 


export type AppDispatch =  typeof store.dispatch // useDispatch lai type dina chayenxa 
export type RootState = ReturnType<typeof store.getState> // useSelector lai type dina chayenxa


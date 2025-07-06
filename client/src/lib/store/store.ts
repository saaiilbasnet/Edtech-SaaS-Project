import { configureStore } from "@reduxjs/toolkit";
import userSlice from './userSlice'
import studentSlice from './studentSlice'

const store = configureStore({
    reducer : {
        userSlice : userSlice,
        studentSlice : studentSlice
    }
})

export default store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType <typeof store.getState>;
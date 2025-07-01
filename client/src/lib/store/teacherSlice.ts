import { createSlice } from "@reduxjs/toolkit";

const teacherSlice = createSlice({
    name : "TeacherSlice",
    initialState : {
        teacherName : "",
        teacherPassword : ""
    },
    reducers :{
        setTeacherName(state, action){
            state.teacherName = "Saaiil"
        },
        setTeacherPassword(state, action){
            state.teacherPassword = "Password"
        }
    }
})

const {setTeacherName, setTeacherPassword} = teacherSlice.actions

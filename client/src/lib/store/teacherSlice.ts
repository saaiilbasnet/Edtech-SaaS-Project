import { createSlice } from "@reduxjs/toolkit";


const teacherSlice = createSlice({
    name : "TeacherSlice",
    initialState : {
        teacherName : "",
        teacherPassword : ""
    },
    reducers :{
        setTeacherName(state, action){
            state.teacherName = action.payload
        },
        setTeacherPassword(state, action){
            state.teacherPassword = action.payload
        }
    }
})

const {setTeacherName, setTeacherPassword} = teacherSlice.actions
export default teacherSlice.reducer
export {setTeacherName, setTeacherPassword}
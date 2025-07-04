import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInitialStudentData } from "./type";

const initialStudentData: IInitialStudentData =  {
        data : ""
    }


const studentSlice = createSlice({
    name : "StudentSlice",
    initialState :  initialStudentData ,
    reducers : {
        setData(state: IInitialStudentData, action:PayloadAction<string>){
            state.data = action.payload
        }
    }
})

const {setData} = studentSlice.actions
export default studentSlice.reducer
export {setData}
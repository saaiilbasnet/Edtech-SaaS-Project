

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInstitute, IInstituteInitialData } from "./instituteSlice.type";
import { Status } from "@/lib/types/type";
import { AppDispatch } from "../store";
import API from "@/lib/http";


const initialState:IInstituteInitialData = {
    institute : {
        instituteAddress : "", 
        instituteEmail : "", 
        institutePhoneNumber : "", 
        instituteName : ""
    }, 
    status : Status.LOADING
} 

const instituteSlice = createSlice({
    name : "institute", 
    initialState : initialState, 
    reducers : {
        setInstitute(state:IInstituteInitialData,action:PayloadAction<IInstitute>){
            state.institute = action.payload
        }, 
        setStatus(state:IInstituteInitialData,action:PayloadAction<Status>){
            state.status = action.payload
        }
    }
})

const {setInstitute,setStatus} = instituteSlice.actions
export default instituteSlice.reducer

export function createInstitute(data:any){
    return async function createInstituteThunk(dispatch:AppDispatch){
        try {
            const response = await API.post("insitute",data)
            if(response.status === 200){
                dispatch(setStatus(Status.SUCCESS))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.ERROR))
        }
    }
}

export function fetchInstitutes(){
    return async function fetchInstitutesThunk(dispatch:AppDispatch){
        try {
            const response = await API.get("institute") 
            
        if(response.status == 200){
            dispatch(setStatus(Status.SUCCESS))
            dispatch(setInstitute(response.data.data))
        }else{
            dispatch(setStatus(Status.ERROR))
        }
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.ERROR))
        }
    }
}
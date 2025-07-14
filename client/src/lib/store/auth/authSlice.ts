import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInitialState, IUserData, IUserLoginData, IUserRegisterData } from "./authSlice.type";
import { Status } from "@/lib/types/type";
import API from "@/lib/http";
import { AppDispatch } from "../store";

const initialState:IInitialState = {
    user : {
        username : "", 
        password : ""
    }, 
    status : Status.LOADING
}

const authSlice = createSlice({
    name : "auth", 
    initialState : initialState, 
    reducers : {
        setUser(state:IInitialState, action:PayloadAction<IUserData>){
            state.user = action.payload
        }, 
        setStatus(state:IInitialState,action:PayloadAction<Status>){
            state.status = action.payload
        }
    }
})

export function registerUser(data: IUserRegisterData){
    return async function registerUserThunk(dispatch:AppDispatch){

        try{
            const response = await API.post("auth/register",data);

            if(response.status === 200){
                dispatch(setStatus(Status.SUCCESS));
            }
            else{
                dispatch(setStatus(Status.ERROR))
            }

        }catch(error){
            console.log("Error : "+error);
            dispatch(setStatus(Status.ERROR))
        }
    }
}

export function loginUserData(data: IUserLoginData){
    return async function loginUserThunk(dispatch:AppDispatch){

        try{
            const response = await API.post("auth/login",data);

            if(response.status === 200){
                dispatch(setStatus(Status.SUCCESS));
            }
            else{
                dispatch(setStatus(Status.ERROR))
            }

        }catch(error){
            console.log("Error : "+error);
            dispatch(setStatus(Status.ERROR))
        }
    }
}

//fetching institutions

export function fetchInstitution(){
    return async function fetchInstitutionThunk(dispatch:AppDispatch){

        try{

            const response = await API.get("institution");

            if(response.status == 200){
                dispatch(setStatus(Status.SUCCESS))
            }
            else{
                dispatch(setStatus(Status.ERROR))
            }

        }catch(error){
            console.log("Error : "+error);
            dispatch(setStatus(Status.ERROR))
        }

    }
}


const {setUser,setStatus} = authSlice.actions
export default authSlice.reducer
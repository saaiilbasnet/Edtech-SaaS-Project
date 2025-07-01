import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
    name : "UserSlice",
    initialState : {
        name : "",
        address : ""
    },
    reducers : {
        setName(state, action){
            state.name = "Saaiil"
        },
        setAddress(state, action){
            state.address = "Gatthaghar"
        }
    }
})
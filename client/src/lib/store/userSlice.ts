import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { IUserInitialState } from './type'

const userInititalState:IUserInitialState = {
        name : "",
        address : ""
    }

const userSlice = createSlice({
    name : "UserSlice",
    initialState : userInititalState,
    reducers : {
        setName(state:IUserInitialState, action:PayloadAction<string>){
           state.name = action.payload
        },
        setAddress(state: IUserInitialState, action: PayloadAction<string>){
            state.address = action.payload
        }
    }
})

const {setName, setAddress} = userSlice.actions


export default userSlice.reducer
export{setName, setAddress}


// dispatch(setName("Saaiil"))
// dispatch(setAddress("Bhaktapur"))
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUserInitialState } from './type'
import API from '../http'

const userInititalState: IUserInitialState = {
    name: "",
    address: ""
}

const userSlice = createSlice({
    name: "UserSlice",
    initialState: userInititalState,
    reducers: {
        setName(state: IUserInitialState, action: PayloadAction<string>) {
            state.name = action.payload
        },
        setAddress(state: IUserInitialState, action: PayloadAction<string>) {
            state.address = action.payload
        }
    }
})

const { setName, setAddress } = userSlice.actions

//register user

function registerUser() {
    return async function registerUserThunk() {
        try {
            const response = await API.post("/user/register");
            if (response.status === 200) {

            }
            else {

            }
        } catch (error) {
            console.log(error);

        }
    }
}

// login user

function loginUser(){
    return async function loginUserThunk(){
        try{
            const response = await API.post("/user/login");
        if(response.status === 200){

        }
        else{
            
        }
        } catch(error){
        console.log(error);
        
    }
}
}

// forget password

function forgetPassword(){
    return async function forgetPasswordThunk(){
        try{
            const response = await API.post("/user/forgetpassword");
        if(response.status === 200){

        }
        else{
            
        }
        } catch(error){
        console.log(error);
        
    }
}
}


export default userSlice.reducer
export { setName, setAddress }


// dispatch(setName("Saaiil"))
// dispatch(setAddress("Bhaktapur"))
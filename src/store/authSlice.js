//to do tomorrow 25/03/25
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const loginUser = async (credentials) => {
    
}

const initialState = {
    isAuthenticated: false, 
    user: null,
    isLoggingOut: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state,action) => {
            state.isAuthenticated = true
            state.user= action.payload
        },
        logoutStart: (state) => {
            state.isLoggingOut= true
        },
        logoutSuccess: (state) =>{
            state.isAuthenticated = false
            state.user = null
            state.isLoggingOut = false
        },
    },
})

export const {loginSuccess, logoutStart, logoutSuccess} = authSlice.actions

export default authSlice.reducer


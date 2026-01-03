import { createSlice } from "@reduxjs/toolkit";

const savedToken = localStorage.getItem("token");

// localstorage tab and browser still value sustained
const initialState ={
    signupData:null,
    loading:false,
token: savedToken ? JSON.parse(savedToken) : null,
};


const authSlice=createSlice({
    name:"auth",
    initialState:initialState ,
    reducers:{
        setSignupData(state,action){
   state.signupData=action.payload
        },

        setLoading(state,action){
            state.loading=action.payload
        },
        setToken(state,action){
            state.token=action.payload
        },
        setLoggedin(state,action){
            state.loading=action.payload
        },
        
    },
})

export const{setToken,setLoading,setSignupData,setLoggedin}=authSlice.actions;
   export default authSlice.reducer;

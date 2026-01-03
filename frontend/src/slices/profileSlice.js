import {createSlice} from '@reduxjs/toolkit'
const savedUser = localStorage.getItem("user");
const initialState={
        loading:false,

user: savedUser ? JSON.parse(savedUser) : null,
}

const profileSlice=createSlice({
    name:"profile",
    initialState:initialState,
    reducers:{
        setUser(state,action){
            state.user=action.payload;
        },
           setLoading(state,action){
                    state.loading=action.payload
                },
    }
})

export const {setUser,setLoading}=profileSlice.actions;
 export default profileSlice.reducer;
import {configureStore, createSlice} from "@reduxjs/toolkit";

let authSlice = createSlice({
    name:"auth",
    initialState:{isloggedin:false},
    reducers:{
        login(state){
            state.isloggedin=true;
        },
        logout(state){
            state.isloggedin=false;
        }
    }
});

export let authActions = authSlice.actions;

export const Store = configureStore({
    reducer:authSlice.reducer
});
import {configureStore, createSlice} from '@reduxjs/toolkit';

const userslice = createSlice({
    name:"user",
    initialState: {isLoggedIn:false},
    reducers:{
        login(state){
            state.isLoggedIn = true;
        },
        logout(state){
            localStorage.removeItem("userid")
            state.isLoggedIn = false;
        }
    }
})

const adminslice = createSlice({
    name:'admin',
    initialState:{isLoggedIn:false},
    reducers:{
        login(state){
            state.isLoggedIn = true;
        },
        logout(state){
            localStorage.removeItem("adminId")
            localStorage.removeItem("token")
            state.isLoggedIn = false;
        },
    }
})
export const userAction =userslice.actions;
export const adminAction =adminslice.actions; 

export const store  = configureStore({
    reducer:{
        user: userslice.reducer,
        admin:adminslice.reducer,
    }
})

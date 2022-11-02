import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  account: { isLoggedIn: false, username: "", password: "", role: "" },
};

const createLoginSlice = (name) => {
  return createSlice({
    name: "login",
    initialState,
    reducers: {
      setData(state, action) {
        state.account.username = action.payload.username;
        state.account.password = action.payload.password;
        state.account.role = action.payload.role;
        state.account.isLoggedIn=action.payload.isLoggedIn
      },
      clearData(state,action){
        state.account = initialState.account;
        console.log(state);
      },
    
    },
  });
};

export const loginSlice = createLoginSlice("login");

export const loginActions = loginSlice.actions;

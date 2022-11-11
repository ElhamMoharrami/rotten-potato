import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  account: {
    isLoggedIn: false,
    username: "",
    password: "",
    role: "",
    fullname: "",
    id: "",
  },
  actionState: { status: "", action: "", title: "" },
};

const createLoginSlice = () => {
  return createSlice({
    name: "login",
    initialState,
    reducers: {
      setData(state, action) {
        state.account.username = action.payload.username;
        state.account.password = action.payload.password;
        state.account.role = action.payload.role;
        state.account.isLoggedIn = action.payload.isLoggedIn;
        state.account.fullname = action.payload.fullname;
        state.account.id = action.payload.id;
      },
      clearData(state) {
        state.account = initialState.account;
      },
      setActionState(state, action) {
        state.actionState = action.payload.actionState;
      },
    },
  });
};

export const loginSlice = createLoginSlice("login");

export const loginActions = loginSlice.actions;

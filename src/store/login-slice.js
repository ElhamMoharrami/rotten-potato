import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  account: {
    isLoggedIn: false,
    username: "",
    password: "",
    role: "",
    fullname: "",
    id: "",
    itemsPerPage: 10,
    theme: "light",
  },
  actionState: { status: "", action: "", title: "" },
  usernameExists:false
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
        state.account.itemsPerPage = action.payload.itemsPerPage;
         state.account.theme = action.payload.theme;
      },
      clearData(state) {
        state.account = initialState.account;
      },
      setActionState(state, action) {
        state.actionState = action.payload.actionState;
      },
      setItemsPerPage(state, action) {
        state.account.itemsPerPage = action.payload.itemsPerPage;
      },
      setIsLoggedIn(state, action) {
        state.account.isLoggedIn = action.payload.isLoggedIn;
      },
      setTheme(state, action) {
        state.account.theme = action.payload.theme;
      },
      setUsernameExists(state,action){
        state.usernameExists=action.payload.usernameExists
      }
    },
  });
};

export const loginSlice = createLoginSlice("login");

export const loginActions = loginSlice.actions;

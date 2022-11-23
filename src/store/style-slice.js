import { createSlice } from "@reduxjs/toolkit";

const itemsPerPage = localStorage.getItem("itemsPerPage")
  ? localStorage.getItem("itemsPerPage")
  : 10;

const initialState = {
  drawer: { open: false },
  itemsPerPage: itemsPerPage,
};

const createStyleSlice = () => {
  return createSlice({
    name: "style",
    initialState,
    reducers: {
      setData(state, action) {
        state.drawer.open = action.payload.open;
      },
      clearData(state, action) {
        state.open = initialState.open;
      },
      setItemsPerPage(state, action) {
        state.itemsPerPage = action.payload.itemsPerPage;
      },
    },
  });
};

export const styleSlice = createStyleSlice("style");

export const styleActions = styleSlice.actions;

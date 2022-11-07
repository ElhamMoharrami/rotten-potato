import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  drawer: { open: false},
};

const createStyleSlice = (name) => {
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
    },
  });
};

export const styleSlice = createStyleSlice("style");

export const styleActions = styleSlice.actions;

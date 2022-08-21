import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";

import comboSlice from "./combo-slice";
import dataSlice from "./data-slice";

const store = configureStore({
  reducer: { combo: comboSlice.reducer, data: dataSlice.reducer },
});

export default store;

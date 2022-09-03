import { configureStore } from "@reduxjs/toolkit";

import dataSlice, { artistsSlice, movieSlice } from "./data-slice";

const store = configureStore({
  reducer: { movies:movieSlice.reducer,crews:artistsSlice.reducer },
});

export default store;
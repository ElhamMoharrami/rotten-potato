import { configureStore } from "@reduxjs/toolkit";

import { artistsSlice, movieSlice } from "./data-slice";

const store = configureStore({
  reducer: { movies: movieSlice.reducer, crews: artistsSlice.reducer },
});

export default store;

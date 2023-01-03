import { configureStore } from "@reduxjs/toolkit";
import { artistsSlice, movieSlice } from "./data-slice";
import { loginSlice } from "./login-slice";
import { styleSlice } from "./style-slice";
import { movieCrewTableSlice, crewMovieTableSlice } from "./dataTable-Slice";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "login",
  blacklist: ["actionState"],
  storage,
};

const reducers = combineReducers({
  login: persistReducer(persistConfig, loginSlice.reducer),
  movies: movieSlice.reducer,
  crews: artistsSlice.reducer,
  style: styleSlice.reducer,
  movieCrewTable: movieCrewTableSlice.reducer,
  crewMovieTable: crewMovieTableSlice.reducer,
});

const store = (preloadedState) => {
  return configureStore({
    reducer: reducers,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
};

export default store;

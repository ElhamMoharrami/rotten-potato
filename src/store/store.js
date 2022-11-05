import { configureStore } from "@reduxjs/toolkit";
import { artistsSlice, movieSlice } from "./data-slice";
import { loginSlice } from "./login-slice";
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
  storage,
};

const reducers = combineReducers({
  login: persistReducer(persistConfig, loginSlice.reducer),
  movies: movieSlice.reducer,
  crews: artistsSlice.reducer,
});

export default configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

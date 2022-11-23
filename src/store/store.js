import { configureStore } from "@reduxjs/toolkit";
import { artistsSlice, movieSlice } from "./data-slice";
import { loginSlice } from "./login-slice";
import { styleSlice } from "./style-slice";
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

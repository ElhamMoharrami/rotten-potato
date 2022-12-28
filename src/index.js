import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import store from "./store/store";
import App from "./App";
import { Provider } from "react-redux";

import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

const preloadedState = {};
const storeindex = store(preloadedState);
let persistor = persistStore(storeindex);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={storeindex}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

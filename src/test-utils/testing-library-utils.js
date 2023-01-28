import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import store from "../store/store.js";

export function renderWithProviders(
  ui,
  {
    history= createMemoryHistory(),
    preloadedState = {},
    storeUtils = store(preloadedState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={storeUtils}>
    <Router location={history.location} navigator={history}>
    {children}
  </Router>
  </Provider>;
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}


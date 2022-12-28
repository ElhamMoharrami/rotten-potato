import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../store/store.js";

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    storeUtils = store(preloadedState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={storeUtils}>{children}</Provider>;
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}


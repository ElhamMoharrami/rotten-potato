import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../../test-utils/testing-library-utils.js";
import { createMemoryHistory } from "history";
import Signup from "../Signup";

test("sign up works properly", () => {
  const history = createMemoryHistory({ initialEntries: ["/signup"] });

  renderWithProviders(<Signup />, {
    history: history,
  });

  const username = screen.getByTestId("signupUsername");
  fireEvent.change(username, { target: { value: "Tom" } });

  const fullname = screen.getByTestId("signupFullname");
  fireEvent.change(fullname, { target: { value: "Tom Felton" } });

  const password = screen.getByTestId("signupPassword");
  fireEvent.change(password, { target: { value: "15161718" } });

  const confirm = screen.getByTestId("signupConfirmPassword");
  fireEvent.change(confirm, { target: { value: "15161718" } });

  const signup = screen.getByRole("button", { name: /Sign up/i });
  expect(signup).toBeInTheDocument();

  expect(history.location.pathname).toBe("/signup");

  fireEvent.click(signup);

  expect(history.location.pathname).toBe("/signin");
});

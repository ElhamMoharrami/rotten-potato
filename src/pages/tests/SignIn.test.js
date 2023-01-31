import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../../test-utils/testing-library-utils.js";
import SignIn from "../Signin";

test("can sign in properly", async () => {
  renderWithProviders(<SignIn />);

  const password = screen.getByTestId("signinPassword");
  fireEvent.change(password, { target: { value: "112233" } });

  const username = screen.getByTestId("signinUsername");
  fireEvent.change(username, { target: { value: "admin" } });

  const signin = screen.getByRole("button", { name: /Sign In/i });
  expect(signin).toBeInTheDocument();
  fireEvent.click(signin);

  const loginConfirm = await screen.findByTestId("signinSuccess");
  expect(loginConfirm).toBeInTheDocument();
});

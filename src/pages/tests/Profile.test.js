import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../../test-utils/testing-library-utils.js";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import ToggleColorMode from "../../components/Theme/Theme";
import Profile from "../Profile";

test("profile edit works correctly", () => {
  renderWithProviders(<Profile />);

  const nameInput = screen.getByLabelText("Full name");
  fireEvent.change(nameInput, { target: { value: "Tom" } });
  expect(nameInput).toHaveDisplayValue("Tom");

  const formSubmit = screen.getByRole("button", { name: /submit/i });
  expect(formSubmit).toBeInTheDocument();
  fireEvent.click(formSubmit);

  expect(nameInput).toHaveDisplayValue("Tom");

  const password = screen.getByLabelText("New password");
  fireEvent.change(password, { target: { value: "123456" } });

  const confirm = screen.getByLabelText("Confirm password");
  fireEvent.change(confirm, { target: { value: "123456" } });

  fireEvent.click(formSubmit);

  expect(confirm).toHaveValue("");
});

test("theme chages correctly", async () => {
  renderWithProviders(
    <ToggleColorMode>
      <Profile />
    </ToggleColorMode>
  );

  const themeButton = screen.getByTestId("theme-button");
  const formSubmit = screen.getByRole("button", { name: /submit/i });

  expect(formSubmit).toHaveStyle("background-color: rgb(25, 118, 210)");
  fireEvent.click(themeButton);
  expect(formSubmit).toHaveStyle("background-color: rgb(144, 202, 249)");
});

test("delete account works properly", () => {
  renderWithProviders(<Profile />);

  const deleteBtn = screen.getByRole("button", { name: /Delete account/i });
  expect(deleteBtn).toBeInTheDocument();

  fireEvent.click(deleteBtn);

  const confirmDelete = screen.getByRole("button", { name: "cancle" });
  expect(confirmDelete).toBeInTheDocument();
  const dialog = screen.getByRole("dialog");

  fireEvent.click(confirmDelete);

  expect(dialog).not.toBeVisible();
});

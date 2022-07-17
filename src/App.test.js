import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

it("should show the welcome message", () => {
  render(<App />);

  const headingElement = screen.getByRole("heading");
  expect(headingElement).toBeInTheDocument();
});

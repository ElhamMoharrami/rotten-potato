import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

it("should render the heading", () => {
  render(<App />);

  const headingElement = screen.getByRole("heading");
  expect(headingElement).toBeInTheDocument();
});

it("should show heading image", () => {
  render(<App />);

  const imgElement = screen.getByRole("img");
  expect(imgElement).toBeInTheDocument();
});

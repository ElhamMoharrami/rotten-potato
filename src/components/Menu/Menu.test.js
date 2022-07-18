import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Menu from "./Menu";

it("should render the heading", () => {
  render(<Menu />);

  const headingElement = screen.getByRole("heading");
  expect(headingElement).toBeInTheDocument();
});

it("should show heading image", () => {
  render(<Menu />);

  const imgElement = screen.getByRole("img");
  expect(imgElement).toBeInTheDocument();
});

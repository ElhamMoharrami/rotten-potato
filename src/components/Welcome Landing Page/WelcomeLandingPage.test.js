import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import WelcomeLandingPage from "./WelcomeLandingPage";

it("should show the welcome message", () => {
  render(<WelcomeLandingPage />);

  const headingElement = screen.getByRole("heading");
  expect(headingElement).toBeInTheDocument();
});


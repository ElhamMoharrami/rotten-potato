import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../../test-utils/testing-library-utils.js";
import MovieDetail from "../MovieDetail";

test("data is shown properly", async () => {
  renderWithProviders(<MovieDetail />);

  const moviePoster = await screen.findByAltText("The King and the Clown");
  expect(moviePoster).toBeInTheDocument();

  const movieTitle = await screen.findByText("Year : 2005");
  expect(movieTitle).toBeInTheDocument();
});

test("commit comment works properly", async () => {
  renderWithProviders(<MovieDetail />);

  const comment = screen.getByTestId("review-comment");
  fireEvent.change(comment, { target: { value: "this is a test" } });
  expect(comment).toHaveDisplayValue("this is a test");

  const formSubmit = screen.getByRole("button", { name: /submit review/i });
  expect(formSubmit).toBeInTheDocument();
  fireEvent.click(formSubmit);

  const alertMsg = await screen.findByRole("alert");
  expect(alertMsg).toBeInTheDocument();
});

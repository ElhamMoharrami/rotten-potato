import { screen} from "@testing-library/react";
import { renderWithProviders } from "../../test-utils/testing-library-utils.js";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import MovieDetail from "../MovieDetail";

test("data is shown properly", async () => {
  const history = createMemoryHistory();
  renderWithProviders(
    <Router location={history.location} navigator={history}>
      <MovieDetail />
    </Router>
  );

  const moviePoster = await screen.findByAltText("Bee Movie");
  expect(moviePoster).toBeInTheDocument();

  const movieTitle = await screen.findByText("Bee Movie");
  expect(movieTitle).toBeInTheDocument();
});


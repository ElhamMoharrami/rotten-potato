import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../test-utils/testing-library-utils.js";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import CrewsDetail from "../CrewsDetail";

test("data is shown properly", async () => {
  const history = createMemoryHistory();
  renderWithProviders(
    <Router location={history.location} navigator={history}>
      <CrewsDetail />
    </Router>
  );

  const crewName = await screen.findByText("Larry King");
  expect(crewName).toBeInTheDocument();
});

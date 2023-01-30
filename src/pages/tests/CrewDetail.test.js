import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../test-utils/testing-library-utils.js";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import CrewsDetail from "../CrewsDetail";

test("data is shown properly", async () => {
  renderWithProviders(<CrewsDetail />);

  const crewName = await screen.findByText("Larry King");
  expect(crewName).toBeInTheDocument();
});

import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../test-utils/testing-library-utils.js";
import CrewsDetail from "../CrewsDetail";

test("data is shown properly", async () => {
  renderWithProviders(<CrewsDetail />);

  const crewName = await screen.findByText("Bong Joon-ho");
  expect(crewName).toBeInTheDocument();
});

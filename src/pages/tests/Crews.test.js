import { screen, fireEvent, within } from "@testing-library/react";
import { renderWithProviders } from "../../test-utils/testing-library-utils.js";
import Crews from "../Crews";

test("search icon is displayed", () => {
  renderWithProviders(<Crews />);
  expect(screen.getByTestId("ManageSearchIcon")).toBeInTheDocument();
});

test("crews are displayed", async () => {
  renderWithProviders(<Crews />);

  const CrewsPoster = await screen.findByAltText("Larry King");
  expect(CrewsPoster).toBeInTheDocument();
});

test("pagination working properly", async () => {
  renderWithProviders(<Crews />);

  const moviePoster = await screen.findByAltText("Larry King");
  expect(moviePoster).toBeInTheDocument();

  const nextPage = await screen.findByTestId("NavigateNextIcon");
  expect(nextPage).toBeInTheDocument();

  fireEvent.click(nextPage);
  expect(moviePoster).not.toBeInTheDocument();
});

test("search by name  working properly", async () => {
  renderWithProviders(<Crews />);

  const searchIcon = screen.getByTestId("ManageSearchIcon");
  fireEvent.click(searchIcon);

  const input = screen.getByLabelText("Artist Name");
  fireEvent.change(input, { target: { value: "Larry" } });
  expect(input).toHaveDisplayValue("Larry");

  const formSubmit = screen.getByRole("button", { name: /submit/i });
  expect(formSubmit).toBeInTheDocument();
  fireEvent.click(formSubmit);

  const moviePoster = await screen.findByAltText("Larry King");
  expect(moviePoster).toBeInTheDocument();
});

test("search by profession works properly", async () => {
  renderWithProviders(<Crews />);

  const searchIcon = screen.getByTestId("ManageSearchIcon");
  fireEvent.click(searchIcon);

  fireEvent.mouseDown(
    screen.getByRole("button", { name: "profession" })
  );

  const listbox = within(screen.getByRole("listbox"));
  fireEvent.click(listbox.getByText("Actress"));

  expect(
    screen.getByRole("button", { name: "profession" })
  ).toHaveTextContent("Actress");

  const formSubmit = screen.getByRole("button", { name: /submit/i });
  expect(formSubmit).toBeInTheDocument();
  fireEvent.click(formSubmit);

  const crewPoster = await screen.findByAltText("Maria Adams");
  expect(crewPoster).toBeInTheDocument();
});


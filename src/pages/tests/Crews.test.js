import { screen, fireEvent, within } from "@testing-library/react";
import { renderWithProviders } from "../../test-utils/testing-library-utils.js";
import Crews from "../Crews";

test("search icon is displayed", () => {
  renderWithProviders(<Crews />);
  expect(screen.getByTestId("ManageSearchIcon")).toBeInTheDocument();
});

test("crews are displayed", async () => {
  renderWithProviders(<Crews />);
  const CrewsPoster = await screen.findByAltText("Ma Dong-seok");
  expect(CrewsPoster).toBeInTheDocument();
});

test("pagination working properly", async () => {
  renderWithProviders(<Crews />);

  const moviePoster = await screen.findByAltText("Ma Dong-seok");
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
  fireEvent.change(input, { target: { value: "Dong-seok" } });
  expect(input).toHaveDisplayValue("Dong-seok");

  const formSubmit = screen.getByRole("button", { name: /submit/i });
  expect(formSubmit).toBeInTheDocument();
  fireEvent.click(formSubmit);

  const moviePoster = await screen.findByAltText("Ma Dong-seok");
  expect(moviePoster).toBeInTheDocument();
});

test("search by profession works properly", async () => {
  renderWithProviders(<Crews />);

  const searchIcon = screen.getByTestId("ManageSearchIcon");
  fireEvent.click(searchIcon);

  fireEvent.mouseDown(screen.getByRole("button", { name: "profession" }));

  const listbox = within(screen.getByRole("listbox"));
  fireEvent.click(listbox.getByText("Actor"));

  expect(screen.getByRole("button", { name: "profession" })).toHaveTextContent(
    "Actor"
  );

  const formSubmit = screen.getByRole("button", { name: /submit/i });
  expect(formSubmit).toBeInTheDocument();
  fireEvent.click(formSubmit);

  const crewPoster = await screen.findByAltText("Ma Dong-seok");
  expect(crewPoster).toBeInTheDocument();
});

test("sort select works", async () => {
  renderWithProviders(<Crews />);

  const searchIcon = screen.getByTestId("ManageSearchIcon");
  fireEvent.click(searchIcon);

  fireEvent.mouseDown(screen.getByRole("button", { name: "Sort" }));

  const listbox = within(screen.getByRole("listbox"));
  fireEvent.click(listbox.getByText(/Name/i));

  expect(screen.getByRole("button", { name: "Sort" })).toHaveTextContent(
    /Name/i
  );

  const ascBtn = screen.getByLabelText("Ascending");
  fireEvent.change(ascBtn, { target: { checked: true } });

  const formSubmit = screen.getByRole("button", { name: /submit/i });
  expect(formSubmit).toBeInTheDocument();
  fireEvent.click(formSubmit);

  const moviePoster = await screen.findByAltText("Ma Dong-seok");
  expect(moviePoster).toBeInTheDocument();
});

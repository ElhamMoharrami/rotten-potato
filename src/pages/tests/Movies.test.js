import { screen, fireEvent, within } from "@testing-library/react";
import { renderWithProviders } from "../../test-utils/testing-library-utils.js";
import Movies from "../Movies";

test("search icon is displayed", () => {
  renderWithProviders(<Movies />);
  expect(screen.getByTestId("ManageSearchIcon")).toBeInTheDocument();
});

test("movies are displayed", async () => {
  renderWithProviders(<Movies />);

  const moviePoster = await screen.findByAltText("Bee Movie");
  expect(moviePoster).toBeInTheDocument();
});

test("pagination working properly", async () => {
  renderWithProviders(<Movies />);

  const moviePoster = await screen.findByAltText("Bee Movie");
  expect(moviePoster).toBeInTheDocument();

  const nextPage = await screen.findByTestId("NavigateNextIcon");
  expect(nextPage).toBeInTheDocument();

  fireEvent.click(nextPage);
  expect(moviePoster).not.toBeInTheDocument();
});

test("search by title  working properly", async () => {
  renderWithProviders(<Movies />);

  const searchIcon = screen.getByTestId("ManageSearchIcon");
  fireEvent.click(searchIcon);

  const input = screen.getByLabelText("Movie Title");
  fireEvent.change(input, { target: { value: "Twilight" } });
  expect(input).toHaveDisplayValue("Twilight");

  const formSubmit = screen.getByRole("button", { name: /submit/i });
  expect(formSubmit).toBeInTheDocument();
  fireEvent.click(formSubmit);

  const moviePoster = await screen.findByAltText("Twilight Zone: The Movie");
  expect(moviePoster).toBeInTheDocument();
});

test("search pagination works properly", async () => {
  renderWithProviders(<Movies />);

  const moviePoster = await screen.findByAltText("Twilight Zone: The Movie");
  expect(moviePoster).toBeInTheDocument();

  const nextPage = await screen.findByTestId("NavigateNextIcon");
  expect(nextPage).toBeInTheDocument();

  fireEvent.click(nextPage);
  expect(moviePoster).not.toBeInTheDocument();
});

test("search by movie rate works properly", async () => {
  renderWithProviders(<Movies />);

  const searchIcon = screen.getByTestId("ManageSearchIcon");
  fireEvent.click(searchIcon);

  fireEvent.mouseDown(
    screen.getByRole("button", { name: "Movie Rate Select" })
  );

  const listbox = within(screen.getByRole("listbox"));
  fireEvent.click(listbox.getByText(/9/i));

  expect(
    screen.getByRole("button", { name: "Movie Rate Select" })
  ).toHaveTextContent(/9/i);

  const formSubmit = screen.getByRole("button", { name: /submit/i });
  expect(formSubmit).toBeInTheDocument();
  fireEvent.click(formSubmit);

  const moviePoster = await screen.findByAltText("Uno: The Movie");
  expect(moviePoster).toBeInTheDocument();
});

test("search by movie year works properly", async () => {
  renderWithProviders(<Movies />);

  const searchIcon = screen.getByTestId("ManageSearchIcon");
  fireEvent.click(searchIcon);

  const inputYearFrom = screen.getByLabelText("From Year");
  fireEvent.change(inputYearFrom, { target: { value: 2000 } });
  expect(inputYearFrom).toHaveDisplayValue(2000);

  const inputYearTo = screen.getByLabelText("From Year");
  fireEvent.change(inputYearTo, { target: { value: 2005 } });
  expect(inputYearTo).toHaveDisplayValue(2005);

  const formSubmit = screen.getByRole("button", { name: /submit/i });
  expect(formSubmit).toBeInTheDocument();
  fireEvent.click(formSubmit);

  const moviePoster = await screen.findByAltText("Digimon: The Movie");
  expect(moviePoster).toBeInTheDocument();
});

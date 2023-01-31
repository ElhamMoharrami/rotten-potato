import { screen, fireEvent, within } from "@testing-library/react";
import { renderWithProviders } from "../../test-utils/testing-library-utils.js";
import Movies from "../Movies";

test("search icon is displayed", () => {
  renderWithProviders(<Movies />);
  expect(screen.getByTestId("ManageSearchIcon")).toBeInTheDocument();
});

test("movies are displayed", async () => {
  renderWithProviders(<Movies />);

  const moviePoster = await screen.findByAltText(
    "The Gangster, the Cop, the Devil"
  );
  expect(moviePoster).toBeInTheDocument();
});

test("pagination working properly", async () => {
  renderWithProviders(<Movies />);

  const moviePoster = await screen.findByAltText(
    "The Gangster, the Cop, the Devil"
  );
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
  fireEvent.change(input, { target: { value: "Outlaws" } });
  expect(input).toHaveDisplayValue("Outlaws");

  const formSubmit = screen.getByRole("button", { name: /submit/i });
  expect(formSubmit).toBeInTheDocument();
  fireEvent.click(formSubmit);

  const moviePoster = await screen.findByAltText("The Outlaws");
  expect(moviePoster).toBeInTheDocument();
});

test("search pagination works properly", async () => {
  renderWithProviders(<Movies />);

  const moviePoster = await screen.findByAltText("The Outlaws");
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

  fireEvent.mouseDown(screen.getByRole("button", { name: "Movie Rate" }));

  const listbox = within(screen.getByRole("listbox"));
  fireEvent.click(listbox.getByText(/6/i));

  expect(screen.getByRole("button", { name: "Movie Rate" })).toHaveTextContent(
    /6/i
  );

  const formSubmit = screen.getByRole("button", { name: /submit/i });
  expect(formSubmit).toBeInTheDocument();
  fireEvent.click(formSubmit);

  const moviePoster = await screen.findByAltText(
    "The Gangster, the Cop, the Devil"
  );
  expect(moviePoster).toBeInTheDocument();
});

test("search by movie year works properly", async () => {
  renderWithProviders(<Movies />);

  const searchIcon = screen.getByTestId("ManageSearchIcon");
  fireEvent.click(searchIcon);

  const inputYearFrom = screen.getByLabelText("From Year");
  fireEvent.change(inputYearFrom, { target: { value: 2018 } });
  expect(inputYearFrom).toHaveDisplayValue(2018);

  const inputYearTo = screen.getByLabelText("From Year");
  fireEvent.change(inputYearTo, { target: { value: 2022 } });
  expect(inputYearTo).toHaveDisplayValue(2022);

  const formSubmit = screen.getByRole("button", { name: /submit/i });
  expect(formSubmit).toBeInTheDocument();
  fireEvent.click(formSubmit);

  const moviePoster = await screen.findByAltText(
    "The Gangster, the Cop, the Devil"
  );
  expect(moviePoster).toBeInTheDocument();
});

test("genre select works", async () => {
  renderWithProviders(<Movies />);

  const searchIcon = screen.getByTestId("ManageSearchIcon");
  fireEvent.click(searchIcon);

  fireEvent.mouseDown(screen.getByRole("button", { name: "Genre" }));

  const listbox = within(screen.getByRole("listbox"));
  fireEvent.click(listbox.getByText(/Action/i));

  expect(screen.getByRole("button", { name: "Genre" })).toHaveTextContent(
    /Action/i
  );

  const formSubmit = screen.getByRole("button", { name: /submit/i });
  expect(formSubmit).toBeInTheDocument();
  fireEvent.click(formSubmit);

  const moviePoster = await screen.findByAltText("The Outlaws");
  expect(moviePoster).toBeInTheDocument();
});

test("sort select works", async () => {
  renderWithProviders(<Movies />);

  const searchIcon = screen.getByTestId("ManageSearchIcon");
  fireEvent.click(searchIcon);

  fireEvent.mouseDown(screen.getByRole("button", { name: "Sort" }));

  const listbox = within(screen.getByRole("listbox"));
  fireEvent.click(listbox.getByText(/Title/i));

  expect(screen.getByRole("button", { name: "Sort" })).toHaveTextContent(
    /Title/i
  );

  const ascBtn = screen.getByLabelText("Ascending");
  fireEvent.change(ascBtn, { target: { checked: true } });

  const formSubmit = screen.getByRole("button", { name: /submit/i });
  expect(formSubmit).toBeInTheDocument();
  fireEvent.click(formSubmit);

  const moviePoster = await screen.findByAltText(
    "The Gangster, the Cop, the Devil"
  );
  expect(moviePoster).toBeInTheDocument();
});

test("add movie works", async () => {
  const state = {
    login: {
      account: {
        isLoggedIn: true,
        username: "admin",
        password: "112233",
        role: "ADMIN",
        fullname: "Ali Karimi",
        id: "8dfd88a8-fdb4-25aa-b85d-e10256aa68ea",
        itemsPerPage: 10,
        theme: "light",
      },
      actionState: {
        actionState: { status: "", action: "", title: "" },
      },
    },
  };

  renderWithProviders(<Movies />, { preloadedState: state });

  const addCard = await screen.findByAltText("add sign");
  expect(addCard).toBeInTheDocument();

  fireEvent.click(addCard);

  const movieFormTitleInput = await screen.findByLabelText("*Movie Title");
  expect(movieFormTitleInput).toBeInTheDocument();
  fireEvent.change(movieFormTitleInput, { target: { value: "test Movie" } });
  expect(movieFormTitleInput).toHaveDisplayValue("test Movie");

  const imdbRatingInput = await screen.findByLabelText("*IMDB rating");
  expect(imdbRatingInput).toBeInTheDocument();
  fireEvent.change(imdbRatingInput, { target: { value: "6" } });
  expect(imdbRatingInput).toHaveDisplayValue("6");

  const yearInput = await screen.findByLabelText("*Year");
  expect(yearInput).toBeInTheDocument();
  fireEvent.change(yearInput, { target: { value: "2010" } });
  expect(yearInput).toHaveDisplayValue("2010");

  const directorInput = await screen.findByLabelText("*Director");
  expect(directorInput).toBeInTheDocument();
  fireEvent.change(directorInput, { target: { value: "Steven Spielberg" } });
  expect(directorInput).toHaveDisplayValue("Steven Spielberg");

  const formSubmit = screen.getByRole("button", { name: /submit/i });
  expect(formSubmit).toBeInTheDocument();
  fireEvent.click(formSubmit);

  const alertMsg = await screen.findByRole("alert");
  expect(alertMsg).toBeInTheDocument();
});

import { screen, fireEvent, within } from "@testing-library/react";
import { renderWithProviders } from "../../test-utils/testing-library-utils.js";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
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

  fireEvent.mouseDown(screen.getByRole("button", { name: "profession" }));

  const listbox = within(screen.getByRole("listbox"));
  fireEvent.click(listbox.getByText("Actress"));

  expect(screen.getByRole("button", { name: "profession" })).toHaveTextContent(
    "Actress"
  );

  const formSubmit = screen.getByRole("button", { name: /submit/i });
  expect(formSubmit).toBeInTheDocument();
  fireEvent.click(formSubmit);

  const crewPoster = await screen.findByAltText("Maria Adams");
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

  const moviePoster = await screen.findByAltText("A.M. Zopfi");
  expect(moviePoster).toBeInTheDocument();
});

// test("add crew works", async () => {
//   const state = {
//     login: {
//       account: {
//         isLoggedIn: true,
//         username: "admin",
//         password: "112233",
//         role: "ADMIN",
//         fullname: "Ali Karimi",
//         id: "8dfd88a8-fdb4-25aa-b85d-e10256aa68ea",
//         itemsPerPage: 10,
//         theme: "light",
//       },
//       actionState: {
//         actionState: { status: "", action: "", title: "" },
//       },
//     },
//   };
//   const history = createMemoryHistory();
//   renderWithProviders(
//     <Router location={history.location} navigator={history}>
//       <Crews />
//     </Router>,
//     { preloadedState: state }
//   );

//   const addCard = await screen.findByAltText("add sign");
//   expect(addCard).toBeInTheDocument();

//   fireEvent.click(addCard);

//   const nameInput = screen.getByLabelText("*Artist Name");
//   fireEvent.change(nameInput, { target: { value: "Bas" } });
//   expect(nameInput).toHaveDisplayValue("Bas");

//   const birthInput = screen.getByLabelText("*Artist Birth");
//   fireEvent.change(birthInput, { target: { value: "1922" } });
//   expect(birthInput).toHaveDisplayValue("1922");

//   const deathInput = screen.getByLabelText("*Artist Birth");
//   fireEvent.change(deathInput, { target: { value: "2020" } });
//   expect(deathInput).toHaveDisplayValue("2020");

//   const professionInput = screen.getByLabelText("*Artist Profession");
//   fireEvent.change(professionInput, { target: { value: "actor" } });
//   expect(professionInput).toHaveDisplayValue("actor");

//   const formSubmit = screen.getByTestId("crewFormSubmit");
//   expect(formSubmit).toBeInTheDocument();
//   fireEvent.click(formSubmit);

//   const alertMsg = await screen.findByRole("alert");
//   expect(alertMsg).toBeInTheDocument();
// });

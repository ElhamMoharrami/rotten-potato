import { render, screen } from "@testing-library/react";
import cinema from "../../assets/images/cinema-equipment-table.jpg";
import Home from "../Home.js";

test("check if there is a background in homepage", () => {
  render(<Home />);

  const homeBackground = screen.getByRole("img");
  expect(homeBackground).toHaveStyle({
    backgroundImage: `url(${cinema})`,
    height: "100vh",
    marginTop: "-70px",
    fontSize: "50px",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  });
});

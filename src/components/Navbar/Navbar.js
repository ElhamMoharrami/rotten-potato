import React from "react";
import { useDispatch } from "react-redux";
import { artistActions, movieActions } from "../../store/data-slice";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const Navbar = () => {
  const dispatch = useDispatch();

  const homeClickHandler = () => {
    localStorage.clear();
  };

  const moviesClickHandler = () => {
    dispatch(movieActions.clearData());
  };

  const crewsClickHandler = () => {
    dispatch(artistActions.clearData());
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav">
        <Toolbar>
          <Box
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <Typography>Rotton Potato</Typography>
          </Box>
          <List sx={{ display: { xs: "none", sm: "block" } }}>
            <Link
              sx={{ color: "white", margin: 2, textDecoration: "none" }}
              onClick={homeClickHandler}
              href="/"
            >
              Home
            </Link>
            <Link
              sx={{ color: "white", margin: 2, textDecoration: "none" }}
              onClick={moviesClickHandler}
              href="/Movies"
            >
              Movies
            </Link>
            <Link
              sx={{ color: "white", margin: 2, textDecoration: "none" }}
              onClick={crewsClickHandler}
              href="/crews"
            >
              Crews
            </Link>
          </List>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;

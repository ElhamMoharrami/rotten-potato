import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { artistActions, movieActions } from "../../store/data-slice";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import UserDrawer from "../UserDrawer/UserDrawer";

const style = { color: "white", margin: 2, textDecoration: "none" };

const Navbar = () => {
  const dispatch = useDispatch();
  const account = useSelector((state) => state.login.account);
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
            <Link sx={style} onClick={homeClickHandler} href="/">
              Home
            </Link>
            <Link sx={style} onClick={moviesClickHandler} href="/Movies">
              Movies
            </Link>
            <Link sx={style} onClick={crewsClickHandler} href="/crews">
              Crews
            </Link>
          </List>
          {!account.isLoggedIn ? (
            <Link sx={style} href="/signin">
              Sign In
            </Link>
          ) : (
            <UserDrawer sx={{ margin: "0 40px 0 40px" }} />
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;

import React from "react";
import { useSelector,useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import UserDrawer from "../UserDrawer/UserDrawer";
import AppBar from "@mui/material/AppBar";
import { movieActions, artistActions } from "../../store/data-slice";

const style = { color: "white", margin: 2, textDecoration: "none" };

const Navbar = () => {
  const dispatch=useDispatch()
  const account = useSelector((state) => state.login.account);

  const crewsClickHandler = () => {
    //localStorage.clear();
    dispatch(artistActions.clearData())
  };

  const moviesClickHandler=()=>{
    //localStorage.clear();
    dispatch(movieActions.clearData())
  }

  const homeClickHandler=()=>{
    localStorage.clear();
  }

  return (
    <AppBar
      sx={{
        display: "flex",
        fontFamily: '"Roboto","Helvetica","Arial",sans-serif ',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      width="fullwidth"
      position="sticky"
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
          <Typography>Rotton Potato</Typography>
        </Box>
        <List sx={{ marginRight: "70px" }}>
          <Link onClick={homeClickHandler} sx={style} href="/home">
            Home
          </Link>
          <Link onClick={moviesClickHandler} sx={style} href="/Movies">
            Movies
          </Link>
          <Link onClick={crewsClickHandler} sx={style} href="/crews">
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
  );
};

export default Navbar;

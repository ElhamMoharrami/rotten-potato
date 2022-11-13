import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { artistActions, movieActions } from "../../store/data-slice";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import UserDrawer from "../UserDrawer/UserDrawer";
import MuiAppBar from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import { drawerWidth } from "../../assets/config";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const style = { color: "white", margin: 2, textDecoration: "none" };

const Navbar = () => {
  const dispatch = useDispatch();
  const account = useSelector((state) => state.login.account);
  const open = useSelector((state) => state.style.drawer.open);

  // const homeClickHandler = () => {
  //   localStorage.clear();
  // };

  const moviesClickHandler = () => {
    dispatch(movieActions.clearData());
  };

  const crewsClickHandler = () => {
    dispatch(artistActions.clearData());
  };

  return (
    <Box
      sx={{
        display: "flex",
        fontFamily: '"Roboto","Helvetica","Arial",sans-serif ',
        marginBottom: "60px",
      }}
    >
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
            <Typography>Rotton Potato</Typography>
          </Box>
          <List sx={{ marginRight: "70px" }}>
            <Link sx={style} href="/home">
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

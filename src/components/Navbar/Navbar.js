/* istanbul ignore file */
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Link as LinkRouter } from "react-router-dom";
import UserDrawer from "../UserDrawer/UserDrawer";
import AppBar from "@mui/material/AppBar";

const style = { color: "white", margin: "15px", textDecoration: "none" };

const Navbar = () => {
  const account = useSelector((state) => state.login.account);

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
          <LinkRouter style={style} to="/home">
            Home
          </LinkRouter>
          <LinkRouter style={style} to="/movies">
            Movies
          </LinkRouter>
          <LinkRouter style={style} to="/crews">
            Crews
          </LinkRouter>
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

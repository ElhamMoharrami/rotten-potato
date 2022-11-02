import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { AccountCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginActions } from "../../store/login-slice";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";

const UserDrawer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const account = useSelector((state) => state.login.account);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    dispatch(
      loginActions.setData({
        role: "",
        username: "",
        password: "",
        isLoggedIn: false,
      })
    );
    localStorage.clear();
    setAnchorEl(null);
    navigate("/movies");
  };

  return (
    <div>
      <AccountCircle
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      />
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box
          sx={{
            width: "200px",
            margin: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <span>
            username <i></i>
            {account.username}
          </span>
          <span>
            role <i></i>
            {account.role}
          </span>
        </Box>
        <MenuItem onClick={logoutHandler}>Logout</MenuItem>
      </Menu>
    </div>
  );
};
export default UserDrawer;

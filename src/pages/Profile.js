import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Box } from "@mui/material";
import { InputLabel } from "@mui/material";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { updateAccount } from "../store/api-call";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { deleteAccount } from "../store/api-call";
import Confirmation from "../components/Confirmation/Confirmation";
import { useNavigate } from "react-router-dom";
import { loginActions } from "../store/login-slice";
import AlertMessage from "../components/Alert/Alert";
import { ThemeSelector } from "../components/Theme/Theme";
import { Input, FormHelperText } from "@mui/material";
import { FormControl } from "@mui/material";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const account = useSelector((state) => state.login.account);

  const [confirmMsg, setConfirmMsg] = useState(false);
  const actionState = useSelector((state) => state.login.actionState);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [profileForm, setProfileForm] = useState({});
  const [usernameIsValid, setUsernameIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [showPass, setShowPass] = useState(false);

  const showPasswordHandler = () => setShowPass(!showPass);

  const onchangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setProfileForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "fullname") {
      if (value.length > 50) {
        setUsernameIsValid(false);
      } else {
        setUsernameIsValid(true);
      }
    }
    if (name === "newPassword") {
      if (value.length > 6) {
        setPasswordIsValid(false);
      } else {
        setPasswordIsValid(true);
      }
    }
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
    dispatch(
      loginActions.setActionState({
        actionState: { status: "", action: "", title: "" },
      })
    );
  };
  const handleOpenConfirm = () => setOpenConfirm(true);
  const handleCloseConfirm = () => setOpenConfirm(false);

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const data = new FormData(event.currentTarget);

    if (data.get("fullname") !== account.fullname) {
      const dataObj = {
        username: account.username,
        fullname: data.get("fullname"),
        password: account.password,
        id: account.id,
        role: data.get("role"),
      };
      dispatch(updateAccount(dataObj, loginActions));
    }

    if (
      data.get("newPassword") === data.get("confirmPassword") &&
      data.get("newPassword") !== account.password &&
      data.get("newPassword") !== ""
    ) {
      const dataObj = {
        username: account.username,
        fullname: data.get("fullname"),
        password: data.get("newPassword"),
        id: account.id,
        role: data.get("role"),
      };
      dispatch(updateAccount(dataObj, loginActions));
    }
    if (data.get("newPassword") !== data.get("confirmPassword")) {
      setConfirmMsg(true);
    }
    setOpenAlert(true);
  };

  const deleteHandler = () => {
    dispatch(deleteAccount(account.id));
    dispatch(
      loginActions.setData({
        role: "",
        username: "",
        password: "",
        isLoggedIn: false,
      })
    );
    localStorage.clear();

    navigate("/signin");
    console.log(account.id);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Typography>Profile</Typography>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <Input
                  name="fullname"
                  required
                  fullWidth
                  placeholder="fullname*"
                  autoFocus
                  defaultValue={account.fullname}
                  onChange={onchangeHandler}
                />
                {!usernameIsValid && (
                  <FormHelperText>
                    fullname should not be more than 50 characters.
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="username"
                name="username"
                fullWidth
                id="username"
                label="username"
                autoFocus
                defaultValue={account.username}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="role"
                label="role"
                type="role"
                id="role"
                InputProps={{ readOnly: true }}
                autoComplete="role"
                defaultValue={account.role}
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel>Change password</InputLabel>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <Input
                  required
                  fullWidth
                  onChange={onchangeHandler}
                  name="newPassword"
                  placeholder="newPassword"
                  type={showPass ? "text" : "password"}
                  id="newPassword"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={showPasswordHandler}
                      >
                        {showPass ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {!passwordIsValid && (
                  <FormHelperText>
                    password should not be more than 6 characters.
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <Input
                  required
                  fullWidth
                  onChange={onchangeHandler}
                  name="confirmPassword"
                  placeholder="confirmPassword*"
                  type={showPass ? "text" : "password"}
                  id="confirmPassword"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle confirmPassword visibility"
                        onClick={showPasswordHandler}
                      >
                        {showPass ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              {confirmMsg && (
                <Typography>
                  password and confirm password do not match.
                </Typography>
              )}
              {actionState.action === "update" && (
                <AlertMessage
                  openAlert={openAlert}
                  handleCloseAlert={handleCloseAlert}
                  actionState={actionState}
                  title={actionState.title}
                />
              )}
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                submit
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Grid container spacing={2} sx={{ margin: 5 }}>
          <Typography>Setting</Typography>
          <Grid item xs={12}>
            <Button
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={handleOpenConfirm}
              color="error"
            >
              Delete account
            </Button>
            {openConfirm && (
              <Confirmation
                openConfirm={openConfirm}
                handleCloseConfirm={handleCloseConfirm}
                deleteHandler={deleteHandler}
              />
            )}
          </Grid>
          <Grid item xs={12}>
            <ThemeSelector />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Profile;

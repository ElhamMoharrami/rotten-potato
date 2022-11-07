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
import { deleteAccount } from "../store/api-call";
import Confirmation from "../components/Confirmation/Confirmation";
import { useNavigate } from "react-router-dom";
import { loginActions } from "../store/login-slice";
import AlertMessage from "../components/Alert/Alert";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const account = useSelector((state) => state.login.account);
  const [confirmMsg, setConfirmMsg] = useState(false);
  const actionState = useSelector((state) => state.login.actionState);
  const [successMsg, setSuccessMsg] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openAlert, setOpenAlert] = useState(true);

  const handleCloseAlert = () => setOpenAlert(false);
  const handleOpenConfirm = () => setOpenConfirm(true);
  const handleCloseConfirm = () => setOpenConfirm(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (
      data.get("new-password") === data.get("confirmPassword") &&
      data.get("new-password") !== account.password &&
      data.get("new-password") !== ""
    ) {
      const dataObj = {
        username: account.username,
        fullname: data.get("fullname"),
        password: data.get("new-password"),
        id: account.id,
        role: data.get("role"),
      };
      dispatch(updateAccount(dataObj, loginActions));
      setSuccessMsg(true);
    } else if (data.get("new-password") !== data.get("confirmPassword")) {
      setConfirmMsg(true);
    }

    setSuccessMsg(true);
  };

  const deleteHandler = () => {
    // dispatch(deleteAccount(account.id));
    // dispatch(
    //   loginActions.setData({
    //     role: "",
    //     username: "",
    //     password: "",
    //     isLoggedIn: false,
    //   })
    // );
    // localStorage.clear();

    // navigate("/signin");
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
              <TextField
                autoComplete="fullname"
                name="fullname"
                fullWidth
                id="fullname"
                label="fullname"
                autoFocus
                defaultValue={account.fullname}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="username"
                label="username"
                type="username"
                id="username"
                InputProps={{ readOnly: true }}
                autoComplete="username"
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
              <TextField
                fullWidth
                name="new-password"
                label="new password"
                type="new-password"
                id="new-password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="confirmPassword"
                label="confirm new Password"
                type="confirmPassword"
                id="confirmPassword"
                autoComplete="confirm-password"
              />
            </Grid>
            <Grid item xs={12}>
              {confirmMsg && (
                <Typography>
                  password and confirm password do not match.
                </Typography>
              )}
              {actionState.status !== "" && successMsg && (
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
        </Grid>
      </Box>
    </Container>
  );
};

export default Profile;

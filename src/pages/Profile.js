import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Box } from "@mui/material";
import { InputLabel } from "@mui/material";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { updateAccount } from "../store/api-call";

const Profile = () => {
  const dispatch = useDispatch();
  const account = useSelector((state) => state.login.account);
  const actionState = useSelector((state) => state.login.actionState);
  const [confirmMsg, setConfirmMsg] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

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
      dispatch(updateAccount(dataObj, "login"));
    } else if (data.get("new-password") !== data.get("confirmPassword")) {
      setConfirmMsg(true);
    }

    setSuccessMsg(true)
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
              {successMsg && (
                <Typography>
                 Password Changed Successfully!
                </Typography>
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
      </Box>
    </Container>
  );
};

export default Profile;

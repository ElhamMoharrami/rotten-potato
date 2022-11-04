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
  const [showMsg, setShowMsg] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (
      data.get("new-password") === data.get("confirmPassword") &&
      data.get("password") !== account.password
    ) {
      const dataObj = {
        username: account.username,
        fullname: data.get("fullname"),
        password: data.get("new-password"),
        id: account.id,
      };
      dispatch(updateAccount(dataObj));
    } else {
      setShowMsg(true);
    }
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
            <Grid item xs={6}>
              <InputLabel>Change password</InputLabel>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="password"
                label="password"
                type="password"
                id="password"
                autoComplete="password"
              />
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
                label="confirm Password"
                type="confirmPassword"
                id="confirmPassword"
                autoComplete="confirm-password"
              />
            </Grid>
            <Grid item xs={12}>
              {showMsg && (
                <Typography>
                  password and confirm password do not match.
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

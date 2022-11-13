import * as React from "react";
import { login } from "../store/api-call";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AlertMessage from "../components/Alert/Alert";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Input, FormHelperText } from "@mui/material";
import { FormControl } from "@mui/material";

const Signin = () => {
  const dispatch = useDispatch();
  const [signinForm, setSigninForm] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [usernameIsValid, setUsernameIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [openAlert, setOpenAlert] = useState(false);
  const actionState = useSelector((state) => state.login.actionState);

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const showPasswordHandler = () => setShowPass(!showPass);

  const onchangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setSigninForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "username") {
      if (value.length > 20) {
        setUsernameIsValid(false);
      } else {
        setUsernameIsValid(true);
      }
    }
    if (name === "password") {
      if (value.length > 6) {
        setPasswordIsValid(false);
      } else {
        setPasswordIsValid(true);
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(signinForm);
    if (passwordIsValid && usernameIsValid) {
      const dataObj = {
        username: signinForm.username,
        password: signinForm.password,
      };
      dispatch(login(dataObj));
    }

    setOpenAlert(true);
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
        <Avatar sx={{ m: 1, bgcolor: "#1976d2" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <Input
                  name="username"
                  required
                  fullWidth
                  placeholder="username*"
                  autoFocus
                  onChange={onchangeHandler}
                />
                {!usernameIsValid && (
                  <FormHelperText>
                    username should not be more than 20 characters.
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
                  name="password"
                  placeholder="password*"
                  type={showPass ? "text" : "password"}
                  id="password"
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
            <Grid>
              {actionState.action === "login" && (
                <AlertMessage
                  openAlert={openAlert}
                  handleCloseAlert={handleCloseAlert}
                  actionState={actionState}
                  title={actionState.title}
                />
              )}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signup" variant="body2">
                Don't have an account yet? sign up!
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Signin;

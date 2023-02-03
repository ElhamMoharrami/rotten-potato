import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createAccount, usernameCheck } from "../store/api-call";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Input, FormHelperText } from "@mui/material";
import { FormControl } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signupForm, setSignupForm] = useState({});
  const [showMsg, setShowMsg] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [usernameIsValid, setUsernameIsValid] = useState(true);
  const [fullnameIsValid, setFullnameIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [usernameAlreadyExists, setUsernameAlreadyExists] = useState(false);

  const showPasswordHandler = () => setShowPass(!showPass);

  const userExists = useSelector((state) => state.login.usernameExists);

  const onchangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setSignupForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "username") {
      dispatch(usernameCheck(value));
      if (value.length > 10) {
        setUsernameIsValid(false);
      } else {
        setUsernameIsValid(true);
      }
    }

    if (name === "fullname") {
      if (value.length > 50) {
        setFullnameIsValid(false);
      } else {
        setFullnameIsValid(true);
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

    if (userExists) {
      setUsernameAlreadyExists(true);
    }

    if (signupForm.password === signupForm.confirmPassword && !userExists) {
      const dataObj = {
        username: signupForm.username,
        password: signupForm.password,
        fullname: signupForm.fullname,
        role: "USER",
      };
      dispatch(createAccount(dataObj));
      navigate("/signin");
    }
    if (signupForm.password !== signupForm.confirmPassword) {
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
        <Avatar sx={{ m: 1, bgcolor: "#1976d2" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
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
                  inputProps={{ "data-testid": "signupUsername" }}
                />
                {!usernameIsValid && (
                  <FormHelperText>
                    username should not be more than 10 characters.
                  </FormHelperText>
                )}
                {usernameAlreadyExists && (
                  <FormHelperText>
                    username already exists.please choose another username.
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <Input
                  name="fullname"
                  required
                  fullWidth
                  placeholder="fullname*"
                  autoFocus
                  onChange={onchangeHandler}
                  inputProps={{ "data-testid": "signupFullname" }}
                />
                {!fullnameIsValid && (
                  <FormHelperText>
                    fullname should not be more than 50 characters.
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
                  inputProps={{ "data-testid": "signupPassword" }}
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
                  inputProps={{ "data-testid": "signupConfirmPassword" }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              {showMsg && (
                <Typography color="error">
                  password and confirm password do not match.
                </Typography>
              )}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                already have an account? sign in!
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;

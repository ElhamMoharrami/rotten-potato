import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteAccount, updateAccount } from "../store/api-call";
import { useNavigate } from "react-router-dom";
import { loginActions } from "../store/login-slice";
import AlertMessage from "../components/Alert/Alert";
import { ThemeSelector } from "../components/Theme/Theme";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import Confirmation from "../components/Confirmation/Confirmation";
import {
  Input,
  FormHelperText,
  FormControl,
  Box,
  InputLabel,
} from "@mui/material";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const account = useSelector((state) => state.login.account);
  const options = [
    { value: 10, label: "10" },
    { value: 15, label: "15" },
    { value: 20, label: "20" },
    { value: 30, label: "30" },
  ];

  const [confirmPassMsg, setConfirmPassMsg] = useState(false);
  const actionState = useSelector((state) => state.login.actionState);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [profileForm, setProfileForm] = useState({
    fullname: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [usernameIsValid, setUsernameIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const [defaultItemsPerPage, setDefaultItemsPerPage] = useState("");

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

  const itemsPerPageHandler = (event) => {
    setDefaultItemsPerPage(event.target.value);
   dispatch(loginActions.setItemsPerPage({itemsPerPage:event.target.value}))
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      profileForm.fullname.trim().length !== 0 &&
      profileForm.fullname !== account.fullname
    ) {
      const dataObj = {
        username: account.username,
        fullname: profileForm.fullname,
        password: account.password,
        id: account.id,
        role: account.role,
      };
      dispatch(updateAccount(dataObj, loginActions));
    }
    if (
      profileForm.newPassword === profileForm.confirmPassword &&
      profileForm.newPassword !== account.password &&
      profileForm.newPassword.trim().length !== 0
    ) {
      const dataObj = {
        username: account.username,
        fullname: account.fullname,
        password: profileForm.newPassword,
        id: account.id,
        role: account.role,
      };
      dispatch(updateAccount(dataObj, loginActions));
    }
    if (profileForm.newPassword !== profileForm.confirmPassword) {
      setConfirmPassMsg(true);
    }
    if (profileForm.newPassword === profileForm.confirmPassword) {
      setConfirmPassMsg(false);
    }

    setProfileForm({ fullname: "", newPassword: "", confirmPassword: "" });
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
                InputProps={{ readOnly: true }}
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
                  value={profileForm.newPassword}
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
                  value={profileForm.confirmPassword}
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
              {confirmPassMsg && (
                <Typography color="error">
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
              fullWidth
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
            <FormControl sx={{width:'100%'}}>
              <InputLabel id="select-label">choose items shown per page</InputLabel>
              <Select
                sx={{
                  paddingRight: 2,
                  paddingLeft: 2,
                }}
                value={defaultItemsPerPage}
                labelId="select-label"
                onChange={itemsPerPageHandler}
              >
                {options.map((option, index) => (
                  <MenuItem value={option.value} key={index}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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

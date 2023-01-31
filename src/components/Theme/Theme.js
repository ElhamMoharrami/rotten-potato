import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { ThemeProvider, useTheme, createTheme } from "@mui/material/styles";
import { amber, grey, indigo } from "@mui/material/colors";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { loginActions } from "../../store/login-slice";
import { useDispatch, useSelector } from "react-redux";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

export function ThemeSelector() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        color: "text.primary",
        borderRadius: 1,
        p: 3,
      }}
    >
      {theme.palette.mode} mode
      <IconButton
        sx={{ ml: 1 }}
        onClick={colorMode.toggleColorMode}
        color="inherit"
        data-testid="theme-button"
      >
        {theme.palette.mode === "dark" ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
    </Box>
  );
}

export default function ToggleColorMode(props) {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.login.account.theme);

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        dispatch(
          loginActions.setTheme({ theme: mode === "light" ? "dark" : "light" })
        );
      },
    }),
    [mode, dispatch]
  );

  const getDesignTokens = (mode) => ({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            primary: amber,
            divider: amber[200],
            background: {
              default: grey[50],
              paper: grey[50],
            },
            text: {
              primary: grey[900],
              secondary: grey[800],
            },
          }
        : {
            primary: indigo,
            divider: indigo[700],
            background: {
              default: indigo[600],
              paper: indigo[600],
            },
            text: {
              primary: "#fff",
              secondary: grey[400],
            },
            breakpoints: {
              values: {
                mobile: 0,
                tablet: 640,
                laptop: 1024,
                desktop: 1200,
              },
            },
          }),
    },
  });

  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}

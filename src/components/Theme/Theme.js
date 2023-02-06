import { useContext, createContext, useMemo } from "react";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { ThemeProvider, useTheme, createTheme } from "@mui/material/styles";
import { amber, grey} from "@mui/material/colors";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { loginActions } from "../../store/login-slice";
import { useDispatch, useSelector } from "react-redux";

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export function ThemeSelector() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
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

  const colorMode = useMemo(
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
            // palette values for light mode
            primary: amber,
            divider: amber[200],
            text: {
              primary: grey[900],
              secondary: grey[800],
            },
          }
        : mode === "dark"),
    },
  });

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}

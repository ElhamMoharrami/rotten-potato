import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { styleActions } from "../../store/style-slice";
import { useSelector } from "react-redux";
import { drawerWidth } from "../../assets/config";
import Toolbar from "@mui/material/Toolbar";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const SearchDrawer = ({ search }) => {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.style.drawer.open);

  const handleDrawerOpen = () => {
    dispatch(styleActions.setData({ open: true }));
  };

  const handleDrawerClose = () => {
    dispatch(styleActions.setData({ open: false }));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CssBaseline />
      <Box>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(open && { display: "none" }) }}
        >
          <ManageSearchIcon sx={{ marginLeft: 3 }} />
        </IconButton>
      </Box>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        anchor="left"
        variant="temporary"
        open={open}
      >
        <Toolbar />
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <CloseIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Box sx={{ marginLeft: 2, marginRight: 2, marginBottom: 2 }}>
          {search}
        </Box>
        <Divider />
      </Drawer>
    </Box>
  );
};
export default SearchDrawer;

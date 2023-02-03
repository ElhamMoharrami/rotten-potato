import { useDispatch, useSelector } from "react-redux";
import ListData from "../components/ListData/ListData";
import CrewCard from "../components/CrewCard/CrewCard";
import CrewForm from "../components/CrewForm/CrewForm";
import { artistActions } from "../store/data-slice";
import Box from "@mui/material/Box";
import CrewSearch from "../components/Search/CrewSearch/CrewSearch";
import SearchDrawer from "../components/SearchDrawer/SearchDrawer";
import AlertMessage from "../components/Alert/Alert";
import { styled } from "@mui/material/styles";
import { drawerWidth } from "../assets/config";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: `${drawerWidth}px`,
    }),
  })
);

const Artists = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.crews.data);
  const itemsPerPage = useSelector((state) => state.login.account.itemsPerPage);
  const pageCount = useSelector((state) => state.crews.data.page.pageCount);
  const isSearching = useSelector((state) => state.crews.isSearching);
  const isLoading = useSelector((state) => state.crews.isLoading);
  const actionState = useSelector((state) => state.crews.actionState);
  const openAlert = useSelector((state) => state.crews.openAlert);
  const open = useSelector((state) => state.style.drawer.open);

  const handleCloseAlert = () => {
    dispatch(artistActions.setOpenAlert({ openAlert: false }));
  };

  const card = (item) => {
    return <CrewCard numberOfItemsOnPage={data.content.length} crew={item} />;
  };

  const form = (close, open, actionType) => {
    return <CrewForm open={open} close={close} actionType={actionType} />;
  };

  return (
    <Box>
      {actionState.status !== "" && (
        <AlertMessage
          openAlert={openAlert}
          handleCloseAlert={handleCloseAlert}
          actionState={actionState}
          title={actionState.title}
        />
      )}

      <SearchDrawer
        search={
          <CrewSearch
            itemsPerPage={itemsPerPage}
            currentPage={data.page.currentPage}
            isSearching={isSearching}
          />
        }
      />
      <Main open={open}>
        <ListData
          type="crews"
          data={data}
          card={card}
          action={artistActions}
          isLoading={isLoading}
          isSearching={isSearching}
          form={form}
          itemsPerPage={itemsPerPage}
          currentPage={data.page.currentPage}
          pageCount={pageCount}
        />
      </Main>
    </Box>
  );
};

export default Artists;

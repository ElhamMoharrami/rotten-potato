import React from "react";
import { useSelector, useDispatch } from "react-redux";
import ListData from "../components/ListData/ListData";
import MovieCard from "../components/MovieCard/MovieCard";
import { movieActions } from "../store/data-slice";
import SearchMovie from "../components/Search/MoviesSearch/SearchMovie";
import MovieForm from "../components/MovieForm/MovieForm";
import SearchDrawer from "../components/SearchDrawer/SearchDrawer";
import Box from "@mui/material/Box";
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

const Movies = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.movies.data);
  const itemsPerPage = useSelector((state) => state.login.account.itemsPerPage);
  const pageCount = useSelector((state) => state.movies.data.page.pageCount);
  const isSearching = useSelector((state) => state.movies.isSearching);
  const isLoading = useSelector((state) => state.movies.isLoading);
  const actionState = useSelector((state) => state.movies.actionState);
  const open = useSelector((state) => state.style.drawer.open);
  const openAlert = useSelector((state) => state.movies.openAlert);

  const handleCloseAlert = () => {
    dispatch(movieActions.setOpenAlert({ openAlert: false }));
  };

  const card = (item) => {
    return <MovieCard movie={item} />;
  };

  const form = (close, open, actionType) => {
    return <MovieForm open={open} close={close} actionType={actionType} />;
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
          <SearchMovie
            itemsPerPage={itemsPerPage}
            currentPage={data.page.currentPage}
            open={open}
          />
        }
      />
      <Main open={open}>
        <ListData
          type="movies"
          data={data}
          card={card}
          action={movieActions}
          isLoading={isLoading}
          isSearching={isSearching}
          form={form}
          itemsPerPage={itemsPerPage}
          currentPage={data.page.currentPage}
          actionState={actionState}
          pageCount={pageCount}
        />
      </Main>
    </Box>
  );
};

export default Movies;

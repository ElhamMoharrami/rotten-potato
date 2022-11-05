import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import ListData from "../components/ListData/ListData";
import MovieCard from "../components/MovieCard/MovieCard";
import { movieActions } from "../store/data-slice";
import SearchMovie from "../components/Search/MoviesSearch/SearchMovie";
import MovieForm from "../components/MovieForm/MovieForm";
import SearchDrawer from "../components/SearchDrawer/SearchDrawer";
import Box from "@mui/material/Box";
import AlertMessage from "../components/Alert/Alert";

const Movies = () => {
  const data = useSelector((state) => state.movies.data);
  const isSearching = useSelector((state) => state.movies.isSearching);
  const isLoading = useSelector((state) => state.movies.isLoading);
  const actionState = useSelector((state) => state.movies.actionState);
  const [openAlert, setOpenAlert] = useState(true);

  const handleCloseAlert = () => setOpenAlert(false);

  const card = (item) => {
    return <MovieCard movie={item} />;
  };

  const form = (close, open) => {
    return <MovieForm open={open} close={close} />;
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
        itemsPerPage={data.page.itemsPerPage}
        currentPage={data.page.currentPage}
        isSearching={isSearching}
        search={
          <SearchMovie
            itemsPerPage={data.page.itemsPerPage}
            currentPage={data.page.currentPage}
            isSearching={isSearching}
          />
        }
      />

      <ListData
        type="movies"
        data={data}
        card={card}
        action={movieActions}
        isLoading={isLoading}
        isSearching={isSearching}
        form={form}
        itemsPerPage={data.page.itemsPerPage}
        currentPage={data.page.currentPage}
        actionState={actionState}
      />
    </Box>
  );
};

export default Movies;

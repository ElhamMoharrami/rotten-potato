import React from "react";
import { useSelector } from "react-redux";

import ListData from "../components/ListData/ListData";
import classes from "./Movies.module.css";
import "../assets/commonStyle.scss";
import MovieCard from "../components/MovieCard/MovieCard";
import { movieActions } from "../store/data-slice";
import SearchMovie from "../components/Search/MoviesSearch/SearchMovie";

const Movies = () => {
  const data = useSelector((state) => state.movies.data);
  const isSearching = useSelector((state) => state.movies.isSearching);
  const isLoading = useSelector((state) => state.movies.isLoading);
  const card = (item) => {
    return <MovieCard movie={item} />;
  };
  return (
    <div className={classes["container"]}>
      <SearchMovie
        className={classes["search-container"]}
        itemsPerPage={data.itemsPerPage}
        currentPage={data.currentPage}
        isSearching={isSearching}
      />
      <ListData
        type="movies"
        data={data}
        card={card}
        action={movieActions}
        isLoading={isLoading}
        isSearching={isSearching}
      />
    </div>
  );
};

export default Movies;

import React from "react";
import { useSelector } from "react-redux";

import ListData from "../components/ListData/ListData";

import "../assets/commonStyle.css";
import MovieCard from "../components/MovieCard/MovieCard";
import { movieActions } from "../store/data-slice";

const Movies = () => {
  const data = useSelector((state) => state.movies.data);
  const isLoading = useSelector((state) => state.movies.isLoading);
  const card = (item) => {
    return <MovieCard movie={item} />;
  };
  return (
    <>
      <ListData
        type="movies"
        data={data}
        card={card}
        action={movieActions}
        isLoading={isLoading}
      />
    </>
  );
};

export default Movies;

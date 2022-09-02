import React, { Fragment } from "react";
import { useSelector } from "react-redux";

import Listing from "../components/Listing/Listing";

import "../assets/commonStyle.css";
import MovieCard from "../components/MovieCard/MovieCard";
import { movieActions } from "../store/data-slice";

const Movies = () => {
  const data = useSelector((state) => state.movies.data);
  const card = (item) => {
    return <MovieCard movie={item} key={item.id} />;
  };
  return (
    <>
      <Listing type="movies" data={data} card={card} action={movieActions}  />
    </>
  );
};

export default Movies;

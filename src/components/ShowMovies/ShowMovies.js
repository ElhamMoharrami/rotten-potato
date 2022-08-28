import React, { Fragment } from "react";
import MovieCard from "../MovieCard/MovieCard";

const ShowMovies = (props) => {
  return (
    <Fragment>
      {props.movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </Fragment>
  );
};

export default ShowMovies;

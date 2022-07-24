import React, { Fragment } from "react";

import classes from "./MovieCard.module.css";

const MovieList = (props) => {
  const { movie } = props;
  return (
    <div className={classes["card"]}>
      <img src={movie.Poster} className={classes["card__image"]} alt="Movie" />
      <h2 className={classes["card__Title"]}>{movie.Title}</h2>
      <h3 className={classes["card__score"]}>score 3/10 </h3>
    </div>
  );
};

export default MovieList;

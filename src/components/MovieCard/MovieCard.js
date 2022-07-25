import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "./MovieCard.scss";

const MovieList = (props) => {
  const { movie } = props;
  return (
    <div className="card-item">
      <Link to={`/movie/${movie.imdbID}`}>
        <div className="card-inner">
          <div className="card-top">
            <img src={movie.Poster} alt={movie.Title} />
          </div>
        </div>
        <div className="card-bottom">
          <div className="card-info">
            <h4>{movie.Title}</h4>
            <p>{movie.Year}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieList;

import React from "react";
import { Link } from "react-router-dom";
import "./MovieCard.scss";

const MovieCard = (props) => {
  const { movie } = props;
  return (
    <div className="card-item">
      <Link to={`/Movies/${movie.id}`}>
        <div className="card-inner">
          <div className="card-top">
            <img src={movie.poster} alt={movie.title} />
          </div>
        </div>
        <div className="card-bottom">
          <div className="card-info">
            <h4>{movie.title}</h4>
            <p>{movie.year}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;

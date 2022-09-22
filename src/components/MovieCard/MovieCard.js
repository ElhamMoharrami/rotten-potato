import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteSelectedItem } from "../../store/api-call";
import { useDispatch, useSelector } from "react-redux";
import { movieActions } from "../../store/data-slice";

import "../../assets/CardStyle.scss";
import "../../assets/commonStyle.scss";

const MovieCard = (props) => {
  const { movie } = props;
  const dispatch = useDispatch();

  const currentPage = useSelector((state) => state.movies.data.currentPage);
  const itemsPerPage = useSelector((state) => state.movies.data.itemsPerPage);
  const content = useSelector((state) => state.movies.data.content);

  const deleteHandler = () => {
    dispatch(
      deleteSelectedItem( movie.id, "movies",itemsPerPage, currentPage,movieActions, content.length )
    );
    console.log(content.length);
  };

  return (
    <div className="card-item">
      <Link to={`/movies/${movie.id}`}>
        <div className="card-inner">
          <div className="card-top">
            <img src={movie.poster} alt={movie.title} />
          </div>
        </div>
        <div className="card-bottom">
          <div className="card-info">
            <h4>{movie.title}</h4>
          </div>
        </div>
      </Link>
      {!props.artistDetail && (
        <div className="card-icons">
          <img
            className="button"
            onClick={deleteHandler}
            src="https://img.icons8.com/material-sharp/24/000000/filled-trash.png"
          />
          <Link to={`/movieform/edit/${movie.id}`}>
            <img
              className="button"
              src="https://img.icons8.com/ios-glyphs/30/000000/edit--v1.png"
            />
          </Link>
        </div>
      )}
    </div>
  );
};

export default MovieCard;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchDetail, dataActions, fetchCrews } from "../../store/data-slice";
import { MOVIESURL } from "../../assets/apis/config";

import "./MovieDetail.scss";
import ShowArtists from "../ShowArtists/ShowArtists";

const MovieDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const movie = useSelector((state) => state.data.selectedItem);
  const artists = useSelector((state) => state.data.crew);

  useEffect(() => {
    dispatch(fetchDetail(`${MOVIESURL}/${id}`));
    dispatch(fetchCrews(`${MOVIESURL}/${id}/crews`));
    dispatch(dataActions.clearDetail());
  }, [dispatch, id]);

  return (
    <>
      <div className="section-left">
        <div className="movie-title">{movie.title}</div>
        <div className="movie-rating">
          <span>
            IMDB Rating <i className="fa fa-star"></i> : {movie.imdbRating}
          </span>
          <span>
            IMDB Votes <i className="fa fa-thumbs-up"></i> : {movie.imdbVotes}
          </span>
          <span>
            Runtime <i className="fa fa-film"></i> : {movie.runtime}
          </span>
          <span>
            Year <i className="fa fa-calendar"></i> : {movie.year}
          </span>
        </div>
        <div className="movie-plot">{movie.plot}</div>
        <div className="movie-info">
          <div>
            <span>Director</span>
            <span>{movie.director}</span>
          </div>
          <div>
            <span>Stars</span>
            <span>{movie.actors}</span>
          </div>
          <div>
            <span>Generes</span>
            <span>{movie.genre}</span>
          </div>
          <div>
            <span>Languages</span>
            <span>{movie.language}</span>
          </div>
          <div>
            <span>Awards</span>
            <span>{movie.awards}</span>
          </div>
        </div>
      </div>
      <div className="section-right">
        <img src={movie.poster} alt={movie.title} />
      </div>
      <div className="poster-grid">
        <ShowArtists artists={artists} />
      </div>
    </>
  );
};

export default MovieDetail;
//http://localhost:8080/api/movies/{movie_id}

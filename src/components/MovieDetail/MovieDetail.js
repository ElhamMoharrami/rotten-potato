import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchDetail, fetchDetailList } from "../../store/api-call";

import classes from "./MovieDetail.module.css";
import ShowList from "../ShowList/ShowList";

import { movieActions } from "../../store/data-slice";

const MovieDetail = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const movie = useSelector((state) => state.movies.selectedItem);
  const artists = useSelector((state) => state.movies.detailList);

  useEffect(() => {
    dispatch(fetchDetail(id, "movies", movieActions));
    dispatch(fetchDetailList(id, "movies", "crews", movieActions));
  }, [dispatch, id]);

  return (
    <>
      <div className={classes.container}>
        <div className={classes.details}>
          <p className={classes["movie-title"]}>{movie.title}</p>
          <div className={classes["movie-rating"]}>
            <span>
              IMDB Rating <i></i> : {movie.imdbRating}
            </span>
            <span>
              IMDB Votes <i></i> : {movie.imdbVotes}
            </span>
            <span>
              Runtime <i></i> : {movie.runtime}
            </span>
            <span>
              Year <i></i> : {movie.year}
            </span>
          </div>
          <p className={classes["movie-plot"]}>{movie.plot}</p>
          <div className={classes["movie-info"]}>
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
        <div>
          <img
            src={movie.poster}
            alt={movie.title}
            className={classes["movie-poster"]}
          />
        </div>
      </div>
      <div className={classes.crew}>
        <p className={classes["crew-title"]}>Movie Crew</p>

        <ShowList data={artists} card={props.card} />
      </div>
    </>
  );
};

export default MovieDetail;

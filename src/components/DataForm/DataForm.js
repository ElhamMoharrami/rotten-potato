import React, { useEffect, useRef } from "react";

import Button from "../UI/CustomButton";
import classes from "./DataForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { saveMovie, updateMovie, fetchDetail } from "../../store/api-call";
import { movieActions } from "../../store/data-slice";
import { useParams } from "react-router-dom";
import Card from "../UI/Card/Card";
import { useLocation } from "react-router";

const DataForm = () => {
  const location = useLocation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const isAddMode = !id;

  const movieTitle = useRef(null);
  const imdbRating = useRef(null);
  const imdbVotes = useRef(null);
  const runtime = useRef(null);
  const year = useRef(null);
  const plot = useRef(null);
  const language = useRef(null);
  const director = useRef(null);
  const genre = useRef(null);
  const awards = useRef(null);
  const actors = useRef(null);
  const poster = useRef(null);

  const clearData = () => {
    movieTitle.current.value = null;
    imdbRating.current.value = null;
    imdbVotes.current.value = null;
    runtime.current.value = null;
    year.current.value = null;
    plot.current.value = null;
    language.current.value = null;
    director.current.value = null;
    actors.current.value = null;
    genre.current.value = null;
    awards.current.value = null;
    poster.current.value = null;
  };

  useEffect(() => {
    if (isAddMode === false) {
      dispatch(fetchDetail(id, "movies", movieActions));
    }
  }, [id, dispatch, isAddMode, location.pathname]);

  const movie = useSelector((state) => state.movies.selectedItem);

  const submitHandler = (e) => {
    e.preventDefault();
    if (isAddMode) {
      dispatch(
        saveMovie({
          movieName: movieTitle.current.value,
          imdbRating: imdbRating.current.value,
          imdbVotes: imdbVotes.current.value,
          runtime: runtime.current.value,
          year: year.current.value,
          description: plot.current.value,
          director: director.current.value,
          stars: actors.current.value,
          generes: genre.current.value,
          languages: language.current.value,
          awards: awards.current.value,
          poster: poster.current.value,
        })
      );
    } else {
      dispatch(
        updateMovie(id, {
          id,
          movieName: movieTitle.current.value,
          imdbRating: imdbRating.current.value,
          imdbVotes: imdbVotes.current.value,
          runtime: runtime.current.value,
          year: year.current.value,
          description: plot.current.value,
          director: director.current.value,
          stars: actors.current.value,
          generes: genre.current.value,
          languages: language.current.value,
          awards: awards.current.value,
          poster: poster.current.value,
        })
      );
    }
    clearData();
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <Card className={classes["wrapper"]}>
          <div className={classes["data-form-input"]}>
            <label>Movie name</label>
            <input
              type="text"
              required
              ref={movieTitle}
              defaultValue={isAddMode ? "" : movie.title}
            />
          </div>
          <div className={classes["data-form-input"]}>
            <label>IMDB rating</label>
            <input
              type="text"
              required
              ref={imdbRating}
              defaultValue={isAddMode ? "" : movie.imdbRating}
            />
          </div>
          <div className={classes["data-form-input"]}>
            <label>IMDB votes</label>
            <input
              type="text"
              required
              ref={imdbVotes}
              defaultValue={isAddMode ? "" : movie.imdbVotes}
            />
          </div>
          <div className={classes["data-form-input"]}>
            <label>Runtime</label>
            <input
              type="text"
              defaultValue={isAddMode ? null : movie.runtime}
              required
              ref={runtime}
            />
          </div>
          <div className={classes["data-form-input"]}>
            <label>Year</label>
            <input
              type="text"
              defaultValue={isAddMode ? null : movie.year}
              required
              ref={year}
            />
          </div>
          <div className={classes["data-form-input"]}>
            <label>Description</label>
            <input
              type="text"
              defaultValue={isAddMode ? null : movie.plot}
              required
              ref={plot}
            />
          </div>
          <div className={classes["data-form-input"]}>
            <label>Director</label>
            <input
              type="text"
              defaultValue={isAddMode ? null : movie.director}
              required
              ref={director}
            />
          </div>
          <div className={classes["data-form-input"]}>
            <label>Stars</label>
            <input
              type="text"
              defaultValue={isAddMode ? null : movie.actors}
              required
              ref={actors}
            />
          </div>
          <div className={classes["data-form-input"]}>
            <label>Generes</label>
            <input
              type="text"
              defaultValue={isAddMode ? null : movie.genre}
              required
              ref={genre}
            />
          </div>
          <div className={classes["data-form-input"]}>
            <label>Languages</label>
            <input
              type="text"
              defaultValue={isAddMode ? null : movie.language}
              required
              ref={language}
            />
          </div>
          <div className={classes["data-form-input"]}>
            <label>Awards</label>
            <input
              type="text"
              defaultValue={isAddMode ? null : movie.awards}
              required
              ref={awards}
            />
          </div>
          <div className={classes["data-form-input"]}>
            <label>Poster Url:</label>
            <input
              type="text"
              defaultValue={isAddMode ? null : movie.poster}
              ref={poster}
            />
          </div>

          <Button type="submit">Submit</Button>
        </Card>
      </form>
    </div>
  );
};

export default DataForm;

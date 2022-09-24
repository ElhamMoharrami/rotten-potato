import React, { useEffect, useState } from "react";
import Button from "../UI/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { saveMovie, updateMovie } from "../../store/api-call";
import { fetchDetail } from "../../store/api-call";
import { movieActions } from "../../store/data-slice";
import { useParams } from "react-router-dom";
import Card from "../UI/Card/Card";
import { useForm } from "react-hook-form";
import classes from "./MovieForm.module.css";
import { useNavigate } from "react-router-dom";

const MovieForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { isSubmitSuccessful },
  } = useForm();
  const isAddMode = !id;

  const movie = useSelector((state) => state.movies.selectedItem);
 
  const [movieData, setMovieData] = useState({});

  useEffect(() => {
    dispatch(movieActions.setDetail({ selectedItem: {} }));
    if (!isAddMode) {
      dispatch(fetchDetail(id, "movies", movieActions));
    }
  }, [isAddMode, dispatch, id]);

  useEffect(() => {
    if (!isAddMode) {
      setMovieData(movie);
    }
  }, [movie]);

  const onchangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setMovieData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (isAddMode) {
      dispatch(saveMovie(movieData));
    } else {
      dispatch(updateMovie(id, movieData));
    }
    navigate("/movies");
  };

  React.useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({
        title: "",
        imdbRating: "",
        imdbVotes: "",
        runtime: "",
        year: "",
        plot: "",
        director: "",
        actors: "",
        genre: "",
        language: "",
        awards: "",
        poster: "",
      });
    }
  }, [formState, movieData, reset]);

  return (
    <div>
      <form onSubmit={submitHandler}>
        <Card className={classes["wrapper"]}>
          <div className={classes["data-form-input"]}>
            <label>Movie name</label>
            <input
              type="text"
              {...register("title")}
              onChange={onchangeHandler}
              value={movieData.title || ""}
            />
          </div>
          <div className={classes["data-form-input"]}>
            <label>IMDB rating</label>
            <input
              type="text"
              {...register("imdbRating")}
              onChange={onchangeHandler}
              value={movieData.imdbRating || ""}
            />
          </div>
          <div className={classes["data-form-input"]}>
            <label>IMDB votes</label>
            <input
              type="text"
              {...register("imdbVotes")}
              onChange={onchangeHandler}
              value={movieData.imdbVotes || ""}
            />
          </div>
          <div className={classes["data-form-input"]}>
            <label>Runtime</label>
            <input
              type="text"
              {...register("runtime")}
              onChange={onchangeHandler}
              value={movieData.runtime || ""}
            />
          </div>
          <div className={classes["data-form-input"]}>
            <label>Year</label>
            <input
              type="text"
              {...register("year")}
              onChange={onchangeHandler}
              value={movieData.year || ""}
            />
          </div>
          <div className={classes["data-form-input"]}>
            <label>Description</label>
            <input
              type="text"
              {...register("plot")}
              onChange={onchangeHandler}
              value={movieData.plot || ""}
            />
          </div>
          <div className={classes["data-form-input"]}>
            <label>Director</label>
            <input
              type="text"
              {...register("director")}
              onChange={onchangeHandler}
              value={movieData.director || ""}
            />
          </div>
          <div className={classes["data-form-input"]}>
            <label>Stars</label>
            <input
              type="text"
              {...register("actors")}
              onChange={onchangeHandler}
              value={movieData.actors || ""}
            />
          </div>
          <div className={classes["data-form-input"]}>
            <label>Generes</label>
            <input
              type="text"
              {...register("genre")}
              onChange={onchangeHandler}
              value={movieData.genre || ""}
            />
          </div>
          <div className={classes["data-form-input"]}>
            <label>Languages</label>
            <input
              type="text"
              {...register("language")}
              onChange={onchangeHandler}
              value={movieData.language || ""}
            />
          </div>
          <div className={classes["data-form-input"]}>
            <label>Awards</label>
            <input
              type="text"
              {...register("awards")}
              onChange={onchangeHandler}
              value={movieData.awards || ""}
            />
          </div>
          <div className={classes["data-form-input"]}>
            <label>Poster Url:</label>
            <input
              type="text"
              {...register("poster")}
              onChange={onchangeHandler}
              value={movieData.poster || ""}
            />
          </div>
          <Button type="submit">Submit</Button>
        </Card>
      </form>
    </div>
  );
};

export default MovieForm;

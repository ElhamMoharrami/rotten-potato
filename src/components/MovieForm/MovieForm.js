import React, { useEffect, useState } from "react";
import Button from "../UI/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { saveData, updateData } from "../../store/api-call";
import { fetchDetail } from "../../store/api-call";
import { movieActions } from "../../store/data-slice";
import { useParams } from "react-router-dom";
import Card from "../UI/Card/Card";
import { useForm } from "react-hook-form";
import classes from "./MovieForm.module.css";
import { FormControl } from "@mui/material";
import { InputLabel, Input, FormHelperText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const MovieForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, reset, formState } = useForm();
  const isAddMode = !id;

  const genreOptions = [
    "action",
    "thriller",
    "drama",
    "animation",
    "romance",
    "western",
  ];
  const languageOptions = ["English", "French", "Korean", "Farsi", "Turkish"];

  const movie = useSelector((state) => state.movies.selectedItem);
  const itemsPerPage = useSelector((state) => state.movies.data.itemsPerPage);
  const currentPage = useSelector((state) => state.movies.data.currentPage);
  const currentYear = new Date().getFullYear();

  const [movieData, setMovieData] = useState({});

  const [urlIsValid, setUrlIsValid] = useState(true);
  const [titleLengthIsValid, setTitleLengthIsValid] = useState(true);
  const [rateNumberIsValid, setRateNumberIsValid] = useState(true);
  const [imdbVotesIsValid, setImdbVotesIsValid] = useState(true);
  const [runtimeIsValid, setRuntimeIsValid] = useState(true);
  const [yearIsValid, setYearIsValid] = useState(true);
  const [descriptiionIsValid, setDescriptionIsValid] = useState(true);
  const [directorIsValid, setDirectorIsValid] = useState(true);
  const [starsIsValid, setStarsIsValid] = useState(true);
  const [awardsIsValid, setAwardsIsValid] = useState(true);

  const urlPatternValidation = (url) => {
    const regex = new RegExp(
      "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?"
    );
    const result = regex.test(url);
    if (!result) {
      setUrlIsValid(false);
    }
  };

  const titleLengthValidation = (input) => {
    if (input.length > 200) {
      setTitleLengthIsValid(false);
    }
  };

  const imdbRateValidation = (rate) => {
    if (rate > 10 || rate < 0) {
      setRateNumberIsValid(false);
    }
  };

  const imdbVotesValidation = (votes) => {
    if (votes.length > 8) {
      setImdbVotesIsValid(false);
    }
  };

  const runtimeValidation = (runtime) => {
    if (runtime.length > 5) {
      setRuntimeIsValid(false);
    }
  };

  const yearValidation = (year) => {
    if (year.length > 4) {
      setYearIsValid(false);
    }
  };

  const descriptionValidation = (input) => {
    if (input.length > 500) {
      setDescriptionIsValid(false);
    }
  };

  const directorValidation = (director) => {
    if (director.length > 100) {
      setDirectorIsValid(false);
    }
  };

  const starsValidation = (stars) => {
    if (stars.length > 500) {
      setStarsIsValid(false);
    }
  };

  const awardsValidation = (awards) => {
    if (awards.length > 500) {
      setAwardsIsValid(false);
    }
  };

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
  }, [movie, isAddMode]);

  const onchangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setMovieData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (name === "poster") {
      urlPatternValidation(value);
    }
    if (name === "title") {
      titleLengthValidation(value);
    }
    if (name === "imdbRating") {
      imdbRateValidation(value);
    }
    if (name === "imdbVotes") {
      imdbVotesValidation(value);
    }
    if (name === "runtime") {
      runtimeValidation(value);
    }
    if (name === "year") {
      yearValidation(value);
    }
    if (name === "description") {
      descriptionValidation(value);
    }
    if (name === "director") {
      directorValidation(value);
    }
    if (name === "actors") {
      starsValidation(value);
    }
    if (name === "awards") {
      awardsValidation(value);
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (isAddMode) {
      dispatch(
        saveData(movieData, "movies", itemsPerPage, currentPage, movieActions)
      );
    } else {
      dispatch(
        updateData(
          "movies",
          id,
          movieData,
          itemsPerPage,
          currentPage,
          movieActions
        )
      );
    }
    navigate("/movies");
  };

  const cancelHandler = () => {
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

  const posterClasses = urlIsValid ? "data-form-input" : "invalid-input";
  const formIsValid =
    urlIsValid &&
    titleLengthIsValid &&
    rateNumberIsValid &&
    imdbVotesIsValid &&
    runtimeIsValid &&
    yearIsValid &&
    descriptiionIsValid &&
    directorIsValid &&
    starsIsValid &&
    awardsIsValid;

  return (
    <div>
      <form onSubmit={submitHandler}>
        <Card className={classes["wrapper"]}>
          <div className={classes["title"]}>
            {" "}
            {isAddMode ? <p>add</p> : <p>edit</p>}{" "}
          </div>
          <div className={classes["data-form-input"]}>
            <FormControl>
              <InputLabel htmlFor="title-input">*Movie Title</InputLabel>
              <Input
                error={titleLengthIsValid ? false : true}
                {...register("title")}
                onChange={onchangeHandler}
                value={movieData.title || ""}
                id="title-input"
                aria-describedby="title-input"
                required
              />
              {!titleLengthIsValid && (
                <FormHelperText>
                  should not be longer than 200 characters
                </FormHelperText>
              )}
            </FormControl>
          </div>
          <div className={classes["data-form-input"]}>
            <FormControl>
              <InputLabel htmlFor="imdbRating-input"> *IMDB rating</InputLabel>
              <Input
                type="number"
                error={rateNumberIsValid ? false : true}
                {...register("imdbRating")}
                onChange={onchangeHandler}
                value={movieData.imdbRating || ""}
                id="imdbRating-input"
                aria-describedby="imdbRating-input"
                required
              />
              {!rateNumberIsValid && (
                <FormHelperText>
                  the number must be between 0 and 10
                </FormHelperText>
              )}
            </FormControl>
          </div>
          <div className={classes["data-form-input"]}>
            <FormControl>
              <InputLabel htmlFor="imdbVotes-input">IMDB votes</InputLabel>
              <Input
                type="text"
                error={imdbVotesIsValid ? false : true}
                {...register("imdbVotes")}
                onChange={onchangeHandler}
                value={movieData.imdbVotes || ""}
                id="imdbVotes-input"
                aria-describedby="imdbVotes-input"
              />
              {!imdbVotesIsValid && (
                <FormHelperText>
                  should not be longer than 8 digits.
                </FormHelperText>
              )}
            </FormControl>
          </div>
          <div className={classes["data-form-input"]}>
            <FormControl>
              <InputLabel htmlFor="runtime-input">Runtime</InputLabel>
              <Input
                type="text"
                error={runtimeIsValid ? false : true}
                {...register("runtime")}
                onChange={onchangeHandler}
                value={movieData.runtime || ""}
                id="runtime-input"
                aria-describedby="runtime-input"
              />
              {!runtimeIsValid && (
                <FormHelperText>
                  should not be longer than 5 digits.
                </FormHelperText>
              )}
            </FormControl>
          </div>
          <div className={classes["data-form-input"]}>
            <FormControl>
              <InputLabel htmlFor="year-input"> *Year</InputLabel>
              <Input
                type="text"
                error={yearIsValid ? false : true}
                {...register("year")}
                onChange={onchangeHandler}
                value={movieData.year || ""}
                min="1900"
                max={currentYear}
                id="year-input"
                aria-describedby="year-input"
                required
              />
              {!yearIsValid && (
                <FormHelperText>
                  should not be longer than 4 digits.
                </FormHelperText>
              )}
            </FormControl>
          </div>
          <div className={classes["data-form-input"]}>
            <FormControl>
              <InputLabel htmlFor="plot-input">Description</InputLabel>
              <Input
                type="text"
                error={descriptiionIsValid ? false : true}
                {...register("plot")}
                onChange={onchangeHandler}
                value={movieData.plot || ""}
                id="year-input"
                aria-describedby="year-input"
              />
              {!descriptiionIsValid && (
                <FormHelperText>
                  should not be longer than 500 characters.
                </FormHelperText>
              )}
            </FormControl>
          </div>
          <div className={classes["data-form-input"]}>
            <FormControl>
              <InputLabel htmlFor="director-input"> *Director</InputLabel>
              <Input
                type="text"
                error={directorIsValid ? false : true}
                {...register("director")}
                onChange={onchangeHandler}
                value={movieData.director || ""}
                id="director-input"
                aria-describedby="director-input"
                required
              />
              {!directorIsValid && (
                <FormHelperText>
                  should not be longer than 100 characters.
                </FormHelperText>
              )}
            </FormControl>
          </div>
          <div className={classes["data-form-input"]}>
            <FormControl>
              <InputLabel htmlFor="actors-input">Stars</InputLabel>
              <Input
                type="text"
                error={starsIsValid ? false : true}
                {...register("actors")}
                onChange={onchangeHandler}
                value={movieData.actors || ""}
                id="actors-input"
                aria-describedby="actors-input"
              />
              {!starsIsValid && (
                <FormHelperText>
                  should not be longer than 500 characters.
                </FormHelperText>
              )}
            </FormControl>
          </div>
          <div className={classes["data-form-input"]}>
            <FormControl>
              <InputLabel id="genre-select">Genre</InputLabel>
              <Select
                labelId="genre-select"
                {...register("genre")}
                onChange={onchangeHandler}
                value={movieData.genre || ""}
                id="genre-select"
                label="genre-selec"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {genreOptions.map((genre, index) => (
                  <MenuItem value={genre} key={index}>
                    {genre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className={classes["data-form-input"]}>
            <FormControl>
              <InputLabel id="language-select">Languages</InputLabel>
              <Select
                labelId="language-select"
                {...register("language")}
                onChange={onchangeHandler}
                value={movieData.language || ""}
                id="language-select"
                label="language-selec"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {languageOptions.map((language, index) => (
                  <MenuItem value={language} key={index}>
                    {language}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className={classes["data-form-input"]}>
            <FormControl>
              <InputLabel htmlFor="awards-input">Awards</InputLabel>
              <Input
                type="text"
                error={awardsIsValid ? false : true}
                {...register("awards")}
                onChange={onchangeHandler}
                value={movieData.awards || ""}
                id="awards-input"
                aria-describedby="awards-input"
              />
              {!awardsIsValid && (
                <FormHelperText>
                  should not be longer than 500 characters.
                </FormHelperText>
              )}
            </FormControl>
          </div>
          <div className={classes["data-form-input"]}>
            <FormControl>
              <InputLabel htmlFor="poster-input">Poster Url:</InputLabel>
              <Input
                type="text"
                {...register("poster")}
                onChange={onchangeHandler}
                value={movieData.poster || ""}
                className={classes[`${posterClasses}`]}
                id="poster-input"
                aria-describedby="poster-input"
              />
              {!urlIsValid && <FormHelperText>invalid url.</FormHelperText>}
            </FormControl>
          </div>

          <Button disabled={formIsValid ? false : true} type="submit">
            Submit
          </Button>
          <Button onClick={cancelHandler}>Cancel</Button>
        </Card>
      </form>
    </div>
  );
};

export default MovieForm;

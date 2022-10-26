import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { saveData, updateData, fetchDetail } from "../../store/api-call";
import { movieActions } from "../../store/data-slice";
import { FormControl } from "@mui/material";
import { InputLabel, Input, FormHelperText } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import Modal from "@mui/material/Modal";
import { style } from "../../assets/config";

const MovieForm = (props) => {
  const { actionType, open, close, id } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, formState } = useForm();
  const isAddMode = !id;
  const genreOptions = [
    "Action",
    "Thriller",
    "Drama",
    "Animation",
    "Romance",
    "Western",
    "Adventure",
    "Comedy",
  ];
  const languageOptions = ["English", "French", "Korean", "Farsi", "Turkish"];
  const movie = useSelector((state) => state.movies.selectedItem);
  const actionState = useSelector((state) => state.movies.actionState);
  const itemsPerPage = useSelector(
    (state) => state.movies.data.page.itemsPerPage
  );
  const currentPage = useSelector(
    (state) => state.movies.data.page.currentPage
  );
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

  useEffect(() => {
    dispatch(movieActions.setDetail({ selectedItem: {} }));
    if (!isAddMode && actionType === "edit") {
      dispatch(fetchDetail(id, "movies", movieActions));
    }
  }, [id, actionType, isAddMode]);

  useEffect(() => {
    if (!isAddMode && actionType === "edit") {
      setMovieData(movie);
    }
  }, [movie, isAddMode, actionType]);

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
      if (value.length > 200) {
        setTitleLengthIsValid(false);
      } else {
        setTitleLengthIsValid(true);
      }
    }
    if (name === "imdbRating") {
      if (value > 10 || value < 0) {
        setRateNumberIsValid(false);
      } else {
        setRateNumberIsValid(true);
      }
    }
    if (name === "imdbVotes") {
      if (value.length > 8) {
        setImdbVotesIsValid(false);
      } else {
        setImdbVotesIsValid(true);
      }
    }
    if (name === "runtime") {
      if (value.length > 5) {
        setRuntimeIsValid(false);
      } else {
        setRuntimeIsValid(true);
      }
    }
    if (name === "year") {
      if (value.length > 4) {
        setYearIsValid(false);
      } else {
        setYearIsValid(true);
      }
    }
    if (name === "description") {
      if (value.length > 500) {
        setDescriptionIsValid(false);
      } else {
        setDescriptionIsValid(true);
      }
    }
    if (name === "director") {
      if (value.length > 100) {
        setDirectorIsValid(false);
      } else {
        setDirectorIsValid(true);
      }
    }
    if (name === "actors") {
      if (value.length > 500) {
        setStarsIsValid(false);
      } else {
        setStarsIsValid(true);
      }
    }
    if (name === "awards") {
      if (value.length > 500) {
        setAwardsIsValid(false);
      }
      setAwardsIsValid(true);
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (isAddMode) {
      dispatch(
        saveData(movieData,movieData.title, "movies", itemsPerPage, currentPage, movieActions)
      );
    } else {
      dispatch(
        updateData(
          "movies",
          movieData.title,
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

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      setMovieData({});
    }
  }, [formState, movieData]);

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
    <Box>
      <Modal open={open} onClose={close}>
        <Box sx={style}>
          <CardContent>
            <Typography>
              {actionType} {movie.id}
            </Typography>
          </CardContent>
          <form onSubmit={submitHandler}>
            <Grid container spacing={2}>
              <Grid xs={6}>
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
              </Grid>
              <Grid xs={6}>
                <FormControl>
                  <InputLabel htmlFor="imdbRating-input">
                    *IMDB rating
                  </InputLabel>
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
              </Grid>
              <Grid xs={6}>
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
              </Grid>
              <Grid xs={6}>
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
              </Grid>
              <Grid xs={6}>
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
              </Grid>
              <Grid xs={6}>
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
              </Grid>
              <Grid xs={6}>
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
              </Grid>
              <Grid xs={6}>
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
              </Grid>
              <Grid xs={6}>
                <FormControl>
                  <InputLabel id="genre-select">Genre</InputLabel>
                  <Select
                    labelId="genre-select"
                    {...register("genre")}
                    onChange={onchangeHandler}
                    value={movieData.genre || ""}
                    id="genre-select"
                    label="genre-selec"
                    sx={{
                      paddingRight: 2,
                      paddingLeft: 3,
                    }}
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
              </Grid>
              <Grid xs={6}>
                <FormControl>
                  <InputLabel id="language-select">Languages</InputLabel>
                  <Select
                    labelId="language-select"
                    {...register("language")}
                    onChange={onchangeHandler}
                    value={movieData.language || ""}
                    label="language-selec"
                    sx={{
                      paddingRight: 6,
                      paddingLeft: 4,
                    }}
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
              </Grid>
              <Grid xs={6}>
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
              </Grid>
              <Grid xs={6}>
                <FormControl>
                  <InputLabel htmlFor="poster-input">Poster Url:</InputLabel>
                  <Input
                    type="text"
                    {...register("poster")}
                    onChange={onchangeHandler}
                    value={movieData.poster || ""}
                    id="poster-input"
                    aria-describedby="poster-input"
                  />
                  {!urlIsValid && <FormHelperText>invalid url.</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid xs={12}>
                <Button
                  sx={{
                    width: "100%",
                    color: "black",
                    border: "1px solid rgb(0, 0, 0)",
                  }}
                  disabled={formIsValid ? false : true}
                  type="submit"
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default MovieForm;

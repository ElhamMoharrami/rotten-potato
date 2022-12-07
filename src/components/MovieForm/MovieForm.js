import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  saveData,
  updateData,
  fetchDetail,
  fetchDetailList,
  fetchData,
} from "../../store/api-call";
import { movieActions } from "../../store/data-slice";
import { style, BASEURL } from "../../assets/config";
import { FormControl } from "@mui/material";
import { InputLabel, Input, FormHelperText } from "@mui/material";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import Modal from "@mui/material/Modal";
import { DataGrid } from "@mui/x-data-grid";
import Badge from "@mui/material/Badge";
import { movieCrewTableActions } from "../../store/dataTable-Slice";

const columns = [
  { field: "name", headerName: "Name", width: 130 },
  { field: "id", headerName: "ID", width: 70 },
  { field: "profession", headerName: "Profession", width: 130 },
];

const MovieForm = (props) => {
  const { actionType, open, close, id } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, formState } = useForm();
  const isAddMode = !id;

  const movie = useSelector((state) => state.movies.selectedItem);
  const crewData = useSelector((state) => state.movieCrewTable.data);
  const movieCrew = useSelector((state) => state.movies.detailList);
  const itemsPerPage=useSelector((state)=>state.login.account.itemsPerPage)
  const currentPage = useSelector(
    (state) => state.movies.data.page.currentPage
  );
  const pageCount = useSelector((state) => state.movieCrewTable.page.pageCount);
  const currentYear = new Date().getFullYear();

  const [movieData, setMovieData] = useState({});
  const [openTable, setOpenTable] = useState(false);
  const [selectedTabledData, setSelectedTableData] = useState([]);
  const [numberOfSelectedRows, setNumberOfSelectedRows] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [tableCurrentPage, setTableCurrentPage] = useState(1);

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
  const [languageIsValid, setLanguageIsValid] = useState(true);
  const [genreIsValid, setGenreIsValid] = useState(true);

  const handleOpenTable = () => setOpenTable(true);
  const handleCloseTable = () => setOpenTable(false);

  useEffect(() => {
    dispatch(movieActions.setDetail({ selectedItem: {} }));
    if (!isAddMode && actionType === "edit") {
      dispatch(fetchDetail(id, "movies", movieActions));
      dispatch(fetchDetailList(id, "movies", "crews", movieActions));
    }
  }, [id, actionType, isAddMode, dispatch]);

  useEffect(() => {
    if (!isAddMode && actionType === "edit") {
      setMovieData(movie);
    }
  }, [movie, isAddMode, actionType]);

  useEffect(() => {
    const movieCrewList = movieCrew.map((item) => item.id);
    setSelectedTableData(movieCrewList);
    setNumberOfSelectedRows(movieCrewList.length);
  }, [movieCrew]);

  useEffect(() => {
    if (openTable) {
      dispatch(
        fetchData("crews", pageSize, tableCurrentPage, movieCrewTableActions)
      );
      const movieCrewList = movieCrew.map((item) => item.id);
      setSelectedTableData(movieCrewList);
      setNumberOfSelectedRows(movieCrewList.length);
    }
  }, [pageSize, dispatch, tableCurrentPage, openTable]);

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
    if (name === "language") {
      if (value.length > 200) {
        setLanguageIsValid(false);
      } else {
        setLanguageIsValid(true);
      }
    }
    if (name === "genre") {
      if (value.length > 200) {
        setGenreIsValid(false);
      } else {
        setGenreIsValid(true);
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

  const urlPatternValidation = (url) => {
    const regex = new RegExp(
      "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?"
    );
    const result = regex.test(url);
    if (!result) {
      setUrlIsValid(false);
    }
  };

  const handleSubmitTableData = () => {
    const crews = selectedTabledData.map((item) => {
      return `${BASEURL}/crews/${item}`;
    });
    setMovieData((prevState) => ({
      ...prevState,
      crews: crews,
    }));
    setNumberOfSelectedRows(crews.length);
    setOpenTable(false);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (isAddMode) {
      dispatch(
        saveData(
          movieData,
          movieData.title,
          "movies",
          itemsPerPage,
          currentPage,
          movieActions
        )
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
            <Grid container spacing={4}>
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
                  <InputLabel htmlFor="title-input">Genres</InputLabel>
                  <Input
                    error={genreIsValid ? false : true}
                    {...register("genre")}
                    onChange={onchangeHandler}
                    value={movieData.genre || ""}
                    id="genre-input"
                    aria-describedby="genre-input"
                  />
                  {!genreIsValid && (
                    <FormHelperText>
                      should not be longer than 200 characters
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid xs={6}>
                <FormControl>
                  <InputLabel htmlFor="title-input">Languages</InputLabel>
                  <Input
                    error={languageIsValid ? false : true}
                    {...register("language")}
                    onChange={onchangeHandler}
                    value={movieData.language || ""}
                    id="language-input"
                    aria-describedby="language-input"
                  />
                  {!languageIsValid && (
                    <FormHelperText>
                      should not be longer than 200 characters
                    </FormHelperText>
                  )}
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
              <Grid item xs={12}>
                <Box>
                  <Badge badgeContent={numberOfSelectedRows} color="primary">
                    <Button onClick={handleOpenTable}>Add crew</Button>
                  </Badge>
                  <Modal
                    hideBackdrop
                    open={openTable}
                    onClose={handleCloseTable}
                    aria-labelledby="child-modal-title"
                    aria-describedby="child-modal-description"
                  >
                    <Box sx={{ ...style }}>
                      <div style={{ height: 400, width: "100%" }}>
                        <DataGrid
                          rows={crewData}
                          columns={columns}
                          checkboxSelection
                          pagination
                          onSelectionModelChange={(selectionModel) => {
                            setSelectedTableData(selectionModel);
                          }}
                          selectionModel={selectedTabledData}
                          paginationMode="server"
                          rowCount={pageCount}
                          onPageChange={(page) => setTableCurrentPage(page + 1)}
                          pageSize={pageSize}
                          onPageSizeChange={(newPageSize) =>
                            setPageSize(newPageSize)
                          }
                          rowsPerPageOptions={[5, 10, 20]}
                        />
                      </div>
                      <Button onClick={handleCloseTable}>Cancel</Button>
                      <Button onClick={handleSubmitTableData}>submit</Button>
                    </Box>
                  </Modal>
                </Box>
              </Grid>
              <Grid xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={formIsValid ? false : true}
                >
                  submit
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

import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  saveData,
  updateData,
  fetchDetail,
  fetchDetailList,
  fetchTableData,
} from "../../store/api-call";
import { useNavigate } from "react-router-dom";
import { artistActions } from "../../store/data-slice";
import { crewMovieTableActions } from "../../store/dataTable-Slice";
import { style, BASEURL } from "../../assets/config";
import { InputLabel, Input, FormHelperText } from "@mui/material";
import { FormControl } from "@mui/material";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import Modal from "@mui/material/Modal";
import { DataGrid } from "@mui/x-data-grid";
import Badge from "@mui/material/Badge";

const columns = [
  { field: "title", headerName: "title", width: 300 },
  { field: "year", headerName: "year", width: 70 },
];

const CrewForm = (props) => {
  const { actionType, open, close, id } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, formState } = useForm();
  const isAddMode = !id;

  const crew = useSelector((state) => state.crews.selectedItem);
  const crewMovie = useSelector((state) => state.crews.detailList);
  const currentPage = useSelector((state) => state.crews.data.page.currentPage);
  const itemsPerPage = useSelector((state) => state.login.account.itemsPerPage);

  const [crewData, setCreweData] = useState({});

  const [openTable, setOpenTable] = useState(false);
  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total: 0,
    page: 0,
    pageSize: 5,
  });
  const rowData = pageState.data.filter((item) => item.id);
  const [selectedTabledData, setSelectedTableData] = useState([]);
  const [badge, setBadge] = useState(0);
  const movieData = useSelector((state) => state.crewMovieTable.data);
  const totalElements = useSelector(
    (state) => state.crewMovieTable.page.totalElements
  );

  const [nameisValid, setNameIsValid] = useState(true);
  const [birthIsValid, setBirthIsValid] = useState(true);
  const [deathIsValid, setDeathIsValid] = useState(true);
  const [professionIsValid, setProfessionIsValid] = useState(true);
  const [urlIsValid, setUrlIsValid] = useState(true);

  const handleOpenTable = () => setOpenTable(true);
  const handleCloseTable = () => setOpenTable(false);

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
    dispatch(artistActions.setDetail({ selectedItem: {} }));
    if (!isAddMode && actionType === "edit") {
      dispatch(fetchDetail(id, "crews", artistActions));
      dispatch(fetchDetailList(id, "crews", "movies", artistActions));
    }
  }, [isAddMode, dispatch, id, actionType]);

  useEffect(() => {
    if (!isAddMode && actionType === "edit") {
      setCreweData(crew);
      const crewMovies=crewMovie.filter((item)=>item.id)
      const crewMovieList = crewMovies.map((item) => item.id);
      setSelectedTableData(crewMovieList);
      setBadge(crewMovieList.length);
    }
  }, [crew, isAddMode, actionType, crewMovie]);

  useEffect(() => {
    if (openTable) {
      dispatch(
        fetchTableData(
          "movies",
          pageState.pageSize,
          pageState.page + 1,
          crewMovieTableActions
        )
      );
    }
  }, [dispatch, openTable, pageState.pageSize, pageState.page]);

  useEffect(() => {
    setPageState((previouse) => ({
      ...previouse,
      data: movieData,
      total: totalElements,
    }));
  }, [movieData, totalElements]);

  const onchangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setCreweData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "name") {
      if (value.length > 100) {
        setNameIsValid(false);
      } else {
        setNameIsValid(true);
      }
    }
    if (name === "birth") {
      if (value.length > 4) {
        setBirthIsValid(false);
      } else {
        setBirthIsValid(true);
      }
    }
    if (name === "death") {
      if (value.length > 4) {
        setDeathIsValid(false);
      } else {
        setDeathIsValid(true);
      }
    }
    if (name === "profession") {
      if (value.length > 200) {
        setProfessionIsValid(false);
      } else {
        setProfessionIsValid(true);
      }
    }
    if (name === "poster") {
      urlPatternValidation(value);
    } else {
      setUrlIsValid(true);
    }
  };

  const handleSubmitTableData = () => {
    const movies = selectedTabledData.map((item) => {
      return `${BASEURL}/movies/${item}`;
    });
    setCreweData((prevState) => ({
      ...prevState,
      movies: movies,
    }));

    setOpenTable(false);
    setBadge(movies.length);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (isAddMode) {
      dispatch(
        saveData(
          crewData,
          crewData.name,
          "crews",
          itemsPerPage,
          currentPage,
          artistActions
        )
      );
    } else {
      dispatch(
        updateData(
          "crews",
          crewData.name,
          id,
          crewData,
          itemsPerPage,
          currentPage,
          artistActions
        )
      );
    }
    dispatch(artistActions.setOpenAlert({ openAlert: true }));
    navigate("/crews");
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      setCreweData({});
    }
  }, [formState, crewData]);

  const formIsValid =
    nameisValid &&
    birthIsValid &&
    deathIsValid &&
    professionIsValid &&
    urlIsValid;

  return (
    <Modal open={open} onClose={close}>
      <Box sx={style}>
        <CardContent>
          <Typography>
            {isAddMode ? "Add" : "Edit"} {crew.id}
          </Typography>
        </CardContent>
        <form onSubmit={submitHandler}>
          <Grid container spacing={4}>
            <Grid xs={6}>
              <FormControl>
                <InputLabel htmlFor="name-input"> *Artist Name</InputLabel>
                <Input
                  error={nameisValid ? false : true}
                  {...register("name")}
                  onChange={onchangeHandler}
                  value={crewData.name || ""}
                  id="name-input"
                  aria-describedby="name-input"
                  required
                />
                {!nameisValid && (
                  <FormHelperText>
                    should not be longer than 100 characters
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid xs={6}>
              <FormControl>
                <InputLabel htmlFor="birth-input"> *Artist Birth</InputLabel>
                <Input
                  error={birthIsValid ? false : true}
                  {...register("birth")}
                  onChange={onchangeHandler}
                  value={crewData.birth || ""}
                  id="birth-input"
                  aria-describedby="birth-input"
                />
                {!birthIsValid && (
                  <FormHelperText>
                    should not be longer than 4 digits.
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid xs={6}>
              <FormControl>
                <InputLabel htmlFor="death-input"> Artist Death</InputLabel>
                <Input
                  error={deathIsValid ? false : true}
                  {...register("death")}
                  onChange={onchangeHandler}
                  value={crewData.death || ""}
                  id="death-input"
                  aria-describedby="death-input"
                />
                {!deathIsValid && (
                  <FormHelperText>
                    should not be longer than 4 digits.
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid xs={6}>
              <FormControl>
                <InputLabel htmlFor="death-input">
                  *Artist Profession
                </InputLabel>
                <Input
                  error={professionIsValid ? false : true}
                  {...register("profession")}
                  onChange={onchangeHandler}
                  value={crewData.profession || ""}
                  id="profession-input"
                  aria-describedby="profession-input"
                  required
                />
                {!professionIsValid && (
                  <FormHelperText>
                    should not be longer than 200 characters.
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid xs={6}>
              <FormControl>
                <InputLabel htmlFor="poster-input">Poster Url</InputLabel>
                <Input
                  type="text"
                  {...register("poster")}
                  onChange={onchangeHandler}
                  value={crewData.poster || ""}
                  id="poster-input"
                  aria-describedby="poster-input"
                />
                {!urlIsValid && <FormHelperText>invalid url.</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Box>
                <Badge badgeContent={badge} color="primary">
                  <Button onClick={handleOpenTable}>Add Movies</Button>
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
                        rows={rowData}
                        rowCount={pageState.total}
                        loading={pageState.isLoading}
                        page={pageState.page}
                        columns={columns}
                        pagination
                        pageSize={pageState.pageSize}
                        rowsPerPageOptions={[5, 10, 30]}
                        paginationMode="server"
                        onPageChange={(newPage) =>
                          setPageState((previouse) => ({
                            ...previouse,
                            page: newPage,
                          }))
                        }
                        onPageSizeChange={(newSize) =>
                          setPageState((previouse) => ({
                            ...previouse,
                            pageSize: newSize,
                          }))
                        }
                        checkboxSelection
                        onSelectionModelChange={(selectionModel) => {
                          setSelectedTableData([...selectionModel]);
                        }}
                        selectionModel={selectedTabledData}
                        keepNonExistentRowsSelected
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
                sx={{
                  width: "100%",
                  color: "black",
                  border: "1px solid rgb(0, 0, 0)",
                }}
                disabled={formIsValid ? false : true}
                data-testid="crewFormSubmit"
                type="submit"
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

export default CrewForm;

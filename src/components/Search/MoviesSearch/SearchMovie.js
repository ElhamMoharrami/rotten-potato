import { FormControl } from "@mui/material";
import { InputLabel, Input, FormHelperText } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import classes from "./SearchMovie.module.scss";
import { movieActions } from "../../../store/data-slice";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import "../../../assets/commonStyle.scss";
import { fetchSearch } from "../../../store/api-call";

const SearchMovie = (props) => {
  const { itemsPerPage, currentPage, isSearching } = props;
  const dispatch = useDispatch();
  const { register } = useForm();
  const initialData = localStorage.getItem("data");
  const [data, setData] = useState(JSON.parse(initialData) || {});

  const rates = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const genreOptions = [
    "action",
    "thriller",
    "drama",
    "animation",
    "romance",
    "western",
  ];

  const onchangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    localStorage.clear();
    dispatch(movieActions.setIsSearching({ isSearching: "movies" }));
    dispatch(
      fetchSearch(data, "movies", movieActions, itemsPerPage, currentPage)
    );
    localStorage.setItem("data", JSON.stringify(data));
  };

  useEffect(() => {
    if (isSearching === "movies") {
      dispatch(
        fetchSearch(
          data,
          "movies",
          movieActions,
          itemsPerPage,
          currentPage - 1
        )
      );
    }
  }, [itemsPerPage, currentPage, dispatch]);

  return (
    <form onSubmit={submitHandler}>
      <div className={classes["search-container"]}>
        <div className={classes["movie-search-title"]}>
          <FormControl>
            <InputLabel htmlFor="title-input">Movie Title</InputLabel>
            <Input
              {...register("title")}
              onChange={onchangeHandler}
              value={data.title || ""}
              id="title-input"
              aria-describedby="title-input"
            />
          </FormControl>
        </div>
        <div className={classes["movie-search-rate"]}>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="rate-select">Movie Rate</InputLabel>
            <Select
              labelId="rate-select"
              id="rate-select"
              {...register("minRate")}
              onChange={onchangeHandler}
              value={data.minRate || ""}
              label="minRate"
              type="number"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {rates.map((rate, index) => (
                <MenuItem value={rate} key={index}>
                  {rate}+
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className={classes["movie-search-yearFrom"]}>
          <FormControl>
            <InputLabel htmlFor="title-input">From Year</InputLabel>
            <Input
              type="number"
              {...register("yearFrom")}
              onChange={onchangeHandler}
              value={data.yearFrom || ""}
              id="yearFrom-input"
              aria-describedby="yearFrom-input"
            />
            <FormHelperText>example:1900</FormHelperText>
          </FormControl>
        </div>
        <div className={classes["movie-search-yearTo"]}>
          <FormControl>
            <InputLabel htmlFor="title-input">To Year</InputLabel>
            <Input
              type="number"
              {...register("yearTo")}
              onChange={onchangeHandler}
              value={data.yearTo || ""}
              id="yearTo-input"
              aria-describedby="yearTo-input"
            />
            <FormHelperText>example: 2022</FormHelperText>
          </FormControl>
        </div>
        <div className={classes["movie-search-genre"]}>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="genre-select">Genre</InputLabel>
            <Select
              labelId="genre-select"
              {...register("genre")}
              onChange={onchangeHandler}
              value={data.genre || ""}
              id="genre-select"
              label="genre"
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
        <div>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="sort-select">Sort</InputLabel>
            <Select
              labelId="sort-select"
              id="sort-select"
              {...register("sort")}
              onChange={onchangeHandler}
              value={data.sort || ""}
              label="sort"
            >
              <MenuItem value="title">Title</MenuItem>
              <MenuItem value="year">Year</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              Sort order
            </FormLabel>
            <RadioGroup
              aria-labelledby="radio-buttons-group-label"
              name="radio-buttons-group"
              {...register("sortType")}
              onChange={onchangeHandler}
              value={data.sortType || ""}
            >
              <FormControlLabel
                value="asc"
                control={<Radio />}
                label="Ascending"
              />
              <FormControlLabel
                value="desc"
                control={<Radio />}
                label="Descending"
              />
            </RadioGroup>
          </FormControl>
        </div>
      </div>
      <div className={classes["movie-search-button"]}>
        <Button type="submit" variant="outlined">
          submit
        </Button>
      </div>
    </form>
  );
};

export default SearchMovie;

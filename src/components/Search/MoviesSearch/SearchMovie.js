import { FormControl } from "@mui/material";
import { InputLabel, Input, FormHelperText } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { fetchSearchMovies } from "../../../store/api-call";
import { useDispatch } from "react-redux";
import classes from "./SearchMovie.module.scss";
import { movieActions } from "../../../store/data-slice";
import Card from "../../UI/Card/Card";

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

  const upArrowClickHandler = () => {
    setData((prevState) => ({
      ...prevState,
      type: "asc",
    }));
  };

  const downArrowClickHandler = () => {
    setData((prevState) => ({
      ...prevState,
      type: "desc",
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    localStorage.clear();
    dispatch(movieActions.setIsSearching({ isSearching: "movies" }));
    dispatch(
      fetchSearchMovies(
        data.title,
        data.minRate,
        data.startYear,
        data.endYear,
        data.genre,
        data.sortType,
        data.type,
        itemsPerPage,
        currentPage
      )
    );
    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);
  };

  useEffect(() => {
    if (isSearching === "movies") {
      dispatch(
        fetchSearchMovies(
          data.title,
          data.minRate,
          data.startYear,
          data.endYear,
          data.genre,
          data.sortType,
          data.type,
          itemsPerPage,
          currentPage - 1
        )
      );
    }
  }, [itemsPerPage, currentPage, dispatch]);

  return (
    <form onSubmit={submitHandler}>
      <div className={classes["movie-search-container"]}>
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
            <InputLabel id="rate-select">Rate</InputLabel>
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
        <div className={classes["movie-search-startYear"]}>
          <FormControl>
            <InputLabel htmlFor="title-input">from</InputLabel>
            <Input
              type="number"
              {...register("startYear")}
              onChange={onchangeHandler}
              value={data.startYear || ""}
              id="startYear-input"
              aria-describedby="startYear-input"
            />
            <FormHelperText>example:1900</FormHelperText>
          </FormControl>
        </div>
        <div className={classes["movie-search-endYear"]}>
          <FormControl>
            <InputLabel htmlFor="title-input">to</InputLabel>
            <Input
              type="number"
              {...register("endYear")}
              onChange={onchangeHandler}
              value={data.endYear || ""}
              id="endYear-input"
              aria-describedby="endYear-input"
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

        <div className={classes["sort-movie-select"]}>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="sort-movie">Sort</InputLabel>
            <Select
              labelId="sort-movie"
              id="sort-movie"
              {...register("sortType")}
              onChange={onchangeHandler}
              value={data.sortType || ""}
              label="sortType"
            >
              <MenuItem value={"title"}>Title</MenuItem>
              <MenuItem value={"year"}>Year</MenuItem>
            </Select>
          </FormControl>
          <div className={classes["sort-movie-upe-down"]}>
            <div className="button" onClick={upArrowClickHandler}>
              <img src="https://img.icons8.com/ios-glyphs/30/000000/long-arrow-up.png" />
            </div>
            <div className="button" onClick={downArrowClickHandler}>
              <img src="https://img.icons8.com/ios-glyphs/30/000000/long-arrow-down.png" />
            </div>
          </div>
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

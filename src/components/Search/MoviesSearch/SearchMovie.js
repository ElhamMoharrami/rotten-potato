import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchSearch } from "../../../store/api-call";
import { useForm } from "react-hook-form";
import { movieActions } from "../../../store/data-slice";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";
import { FormControl } from "@mui/material";
import { InputLabel, Input, FormHelperText } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/material/Box";

const SearchMovie = (props) => {
  const { itemsPerPage, currentPage, isSearching } = props;
  const dispatch = useDispatch();
  const { register } = useForm();
  const initialData = localStorage.getItem("data");
  const [data, setData] = useState(JSON.parse(initialData) || {});

  const rates = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
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
        fetchSearch(data, "movies", movieActions, itemsPerPage, currentPage)
      );
    }
  }, [itemsPerPage, currentPage, dispatch]);

  return (
    <Box>
      <form onSubmit={submitHandler}>
        <Box>
          <Box>
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
          </Box>
          <Box>
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
          </Box>
          <Box>
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
          </Box>
          <Box>
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
          </Box>
          <Box>
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
          </Box>
          <Box>
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
          </Box>
          <Box>
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
          </Box>
        </Box>
        <Box>
          <Button
            style={{
              width: "100%",
              color: "black",
              border: "1px solid rgb(0, 0, 0)",
            }}
            type="submit"
            variant="outlined"
          >
            submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default SearchMovie;
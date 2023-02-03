import  { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchSearch } from "../../../store/api-call";
import { artistActions } from "../../../store/data-slice";
import { professions } from "../../../assets/config";
import { useForm } from "react-hook-form";
import { InputLabel, Input, FormControl } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";

const CrewSearch = (props) => {
  const { currentPage, itemsPerPage } = props;
  const initialData = localStorage.getItem("crews");

  const [data, setData] = useState(JSON.parse(initialData) || {});
  const dispatch = useDispatch();
  const { register } = useForm();

  const showProfession = (profession) => {
    return (
      profession[0].toUpperCase() + profession.substring(1).replace(/_/g, " ")
    );
  };

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
    dispatch(artistActions.setIsSearching({ isSearching: "crews" }));
    dispatch(
      fetchSearch(data, "crews", artistActions, itemsPerPage, currentPage)
    );
    localStorage.setItem("crews", JSON.stringify(data));
  };

  return (
    <Box>
      <form onSubmit={submitHandler}>
        <Grid
          container
          direction="column"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Grid sx={{ margin: 3 }} item>
            <FormControl>
              <InputLabel htmlFor="name-input">Artist Name</InputLabel>
              <Input
                {...register("name")}
                onChange={onchangeHandler}
                value={data.name || ""}
                id="name-input"
                aria-describedby="name-input"
              />
            </FormControl>
          </Grid>
          <Grid sx={{ margin: 3 }} item>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="profession-select">profession</InputLabel>
              <Select
                labelId="profession-select"
                id="profession-select"
                {...register("profession")}
                onChange={onchangeHandler}
                value={data.profession || ""}
                label="profession"
                variant="standard"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {professions.map((profession, index) => (
                  <MenuItem value={profession} key={index}>
                    {showProfession(profession)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid sx={{ margin: 3 }} item>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="sort-select">Sort</InputLabel>
              <Select
                labelId="sort-select"
                id="sort-select"
                {...register("sort")}
                onChange={onchangeHandler}
                value={data.sort || ""}
                label="sort"
                variant="standard"
              >
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="profession">Profession</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid sx={{ margin: 3 }} item>
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
          </Grid>
        </Grid>
        <Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default CrewSearch;

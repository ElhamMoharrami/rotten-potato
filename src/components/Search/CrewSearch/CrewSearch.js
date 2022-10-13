import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import classes from "./CrewSearch.module.css";
import "../../../assets/commonStyle.scss";
import { FormControl } from "@mui/material";
import { InputLabel, Input, FormHelperText } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { artistActions } from "../../../store/data-slice";
import { professions } from "../../../assets/apis/config";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import "../../../assets/commonStyle.scss";
import { fetchSearch } from "../../../store/api-call";

const CrewSearch = (props) => {
  const { currentPage, itemsPerPage, isSearching } = props;
  const initialData = localStorage.getItem("data");

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
    localStorage.clear();
    dispatch(artistActions.setIsSearching({ isSearching: "crews" }));
    dispatch(
      fetchSearch(data, "crews", artistActions, itemsPerPage, currentPage)
    );
    localStorage.setItem("data", JSON.stringify(data));
  };

  useEffect(() => {
    if (isSearching === "crews") {
      dispatch(
        fetchSearch(data, "crews", artistActions, itemsPerPage, currentPage - 1)
      );
    }
  }, [itemsPerPage, currentPage, dispatch]);

  return (
    <form onSubmit={submitHandler}>
      <div className={classes["search-container"]}>
        <div className={classes["crew-name"]}>
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
        </div>
        <div className={classes["crew-search-profession"]}>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="profession-select">profession</InputLabel>
            <Select
              labelId="profession-select"
              id="profession-select"
              {...register("profession")}
              onChange={onchangeHandler}
              value={data.profession || ""}
              label="profession"
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
        </div>
        <div className={classes["crew-search-birthYear"]}>
          <FormControl>
            <InputLabel htmlFor="birthFrom-input">birthYear</InputLabel>
            <Input
              type="number"
              {...register("birthFrom")}
              onChange={onchangeHandler}
              value={data.birthFrom || ""}
              id="birthFrom-input"
              aria-describedby="birthFrom-input"
            />
            <FormHelperText>example:1900</FormHelperText>
          </FormControl>
        </div>
        <div className={classes["crew-search-endYear"]}>
          <FormControl>
            <InputLabel htmlFor="deathYear-input">deathYear</InputLabel>
            <Input
              type="number"
              {...register("birthTo")}
              onChange={onchangeHandler}
              value={data.birthTo || ""}
              id="birthTo-input"
              aria-describedby="birthTo-input"
            />
            <FormHelperText>example:1900</FormHelperText>
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
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="profession">Profession</MenuItem>
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
      <div className={classes["crew-search-button"]}>
        <Button type="submit" variant="outlined">
          submit
        </Button>
      </div>
    </form>
  );
};

export default CrewSearch;

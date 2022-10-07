import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchSearchCrews } from "../../../store/api-call";
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
    dispatch(artistActions.setIsSearching({ isSearching: "crews" }));
    dispatch(
      fetchSearchCrews(
        data.name,
        data.sortBy,
        data.type,
        data.birthYear,
        data.deathYear,
        data.profession,
        itemsPerPage,
        currentPage
      )
    );
    localStorage.setItem("data", JSON.stringify(data));
  };

  useEffect(() => {
    if (isSearching === "crews") {
      dispatch(
        fetchSearchCrews(
          data.name,
          data.sortBy,
          data.type,
          data.birthYear,
          data.deathYear,
          data.profession,
          itemsPerPage,
          currentPage - 1
        )
      );
    }
  }, [itemsPerPage, currentPage, dispatch]);

  return (
    <form onSubmit={submitHandler}>
      <div className={classes["crew-search-container"]}>
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
            <InputLabel htmlFor="birthYear-input">birthYear</InputLabel>
            <Input
              type="number"
              {...register("birthYear")}
              onChange={onchangeHandler}
              value={data.birthYear || ""}
              id="birthYear-input"
              aria-describedby="birthYear-input"
            />
            <FormHelperText>example:1900</FormHelperText>
          </FormControl>
        </div>
        <div className={classes["crew-search-endYear"]}>
          <FormControl>
            <InputLabel htmlFor="deathYear-input">deathYear</InputLabel>
            <Input
              type="number"
              {...register("deathYear")}
              onChange={onchangeHandler}
              value={data.deathYear || ""}
              id="deathYear-input"
              aria-describedby="deathYear-input"
            />
            <FormHelperText>example:1900</FormHelperText>
          </FormControl>
        </div>
        <div className={classes["sort-crew-select"]}>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="sort-movie">Sort</InputLabel>
            <Select
              labelId="sort-movie"
              id="sort-movie"
              {...register("sortBy")}
              onChange={onchangeHandler}
              value={data.sortBy || ""}
              label="sortBy"
            >
              <MenuItem value={"name"}>Name</MenuItem>
              <MenuItem value={"profession"}>Profession</MenuItem>
            </Select>
          </FormControl>
          <div className={classes["sort-crew-upe-down"]}>
            <div className="button" onClick={upArrowClickHandler}>
              <img src="https://img.icons8.com/ios-glyphs/30/000000/long-arrow-up.png" />
            </div>
            <div className="button" onClick={downArrowClickHandler}>
              <img src="https://img.icons8.com/ios-glyphs/30/000000/long-arrow-down.png" />
            </div>
          </div>
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

import React, { useState } from "react";
import Card from "../../../UI/Card/Card";
import classes from "./SortMovie.module.scss";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";

const MovieSort = () => {
  return (
    <div className={classes["sort-wrapper"]}>
      <div>
        <FormControl fullWidth>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            sort by year
          </InputLabel>
          <NativeSelect
            // onClick={onClickHandler}
            defaultValue={"ascending"}
            inputProps={{
              name: "year",
            }}
          >
            <option value={"ascending"}>ascending</option>
            <option value={"descending"}>descending</option>
          </NativeSelect>
        </FormControl>
      </div>
      <div>
        <FormControl fullWidth>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            sort by title
          </InputLabel>
          <NativeSelect
            defaultValue={30}
            inputProps={{
              name: "age",
              id: "uncontrolled-native",
            }}
          >
            <option value={"A-Z"}>A-Z</option>
            <option value={"Z-A"}>Z-A</option>
          </NativeSelect>
        </FormControl>
      </div>
    </div>
  );
};

export default MovieSort;

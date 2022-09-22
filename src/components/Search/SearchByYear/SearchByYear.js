import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchSearchedYear } from "../../../store/api-call";
import classes from "./SearchByYear.module.scss";
import Button from "../../UI/CustomButton";

const SearchByYear = (props) => {
  const [startYear, setStartYear] = useState(null);
  const [endYear, setEndYear] = useState();
  const dispatch = useDispatch();
  const currentYear = new Date().getFullYear();

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(
      fetchSearchedYear(
        startYear,
        endYear,
        props.currentPage,
        props.itemsPerPage
      )
    );
  };

  return (
    <form onSubmit={submitHandler}>
      <div className={classes['wrapper']}>
        <span className="input">
          <input
            className="search-input"
            type="number"
            min={1900}
            max={currentYear}
            onChange={(event) => setStartYear(event.target.value)}
            placeholder="from"
          />
        </span>
        <span className="input">
          <input
            className="search-input"
            type="number"
            onChange={(event) => setEndYear(event.target.value)}
            placeholder="to"
          />
        </span>
       <Button type='submit'>Search</Button>
      </div>
    </form>
  );
};

export default SearchByYear;

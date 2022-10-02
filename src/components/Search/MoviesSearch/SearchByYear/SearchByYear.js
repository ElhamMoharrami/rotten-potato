import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchSearchedYear } from "../../../../store/api-call";
import classes from "./SearchByYear.module.scss";
import Button from "../../../UI/CustomButton";

const SearchByYear = (props) => {
  const { itemsPerPage, currentPage, action, isSearching } = props;
  const initialStartYear = localStorage.getItem("startYear");
  const initialEndYear = localStorage.getItem("endYear");
  const [startYear, setStartYear] = useState(initialStartYear);
  const [endYear, setEndYear] = useState(initialEndYear);
  const dispatch = useDispatch();
  const currentYear = new Date().getFullYear();

  const submitHandler = (event) => {
    event.preventDefault();
    localStorage.clear();
    dispatch(action.setIsSearching({ isSearching: "year" }));
    dispatch(fetchSearchedYear(startYear, endYear, currentPage, itemsPerPage));
    localStorage.setItem("startYear", startYear);
    localStorage.setItem("endYear", endYear);
  };

  useEffect(() => {
    if (isSearching === "year") {
      dispatch(
        fetchSearchedYear(startYear, endYear, currentPage - 1, itemsPerPage)
      );
    }
  }, [currentPage, itemsPerPage, dispatch]);

  return (
    <div className={classes["wrapper"]}>
      <form onSubmit={submitHandler}>
        <div className={classes["wrapper"]}>
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
              min={1900}
              onChange={(event) => setEndYear(event.target.value)}
              placeholder="to"
            />
          </span>
          <Button type="submit">Search</Button>
        </div>
      </form>
    </div>
  );
};

export default SearchByYear;
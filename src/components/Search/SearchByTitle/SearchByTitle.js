import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchSearchedTitle } from "../../../store/api-call";
import classes from "./SearchByTitle.module.scss";
import "../../../assets/commonStyle.scss";

const SearchByTitle = (props) => {
  const { action, currentPage, itemsPerPage, isSearching } = props;
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const keyDownHandler = (event) => {
    if (event.key === "Enter") {
      dispatch(action.setIsSearching({ isSearching: "title" }));
      dispatch(fetchSearchedTitle(title, currentPage, itemsPerPage));
    }
  };

  useEffect(() => {
    if (isSearching === "title") {
      dispatch(fetchSearchedTitle(title, currentPage, itemsPerPage));
    }
  }, [currentPage, itemsPerPage]);

  return (
    <div className={classes["wrapper"]}>
      <img
        alt="search icon"
        src="https://img.icons8.com/external-line-gradient-kendis-lasman/32/000000/external-search-graphic-design-line-gradient-line-gradient-kendis-lasman.png"
      />
      <span className="input">
        <input
          type="text"
          className="search-input"
          placeholder="search"
          onKeyDown={keyDownHandler}
          onChange={(event) => setTitle(event.target.value)}
          value={title}
        />
      </span>
    </div>
  );
};

export default SearchByTitle;

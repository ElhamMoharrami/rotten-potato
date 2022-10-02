import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchSearchedName } from "../../../../store/api-call";
import classes from "./SearchByName.module.css";
import "../../../../assets/commonStyle.scss";

const SearchByName = (props) => {
  const { action, currentPage, itemsPerPage, isSearching } = props;
  const initialName = localStorage.getItem("name");
  const [name, setName] = useState(initialName || "");
  const dispatch = useDispatch();

  const keyDownHandler = (event) => {
    if (event.key === "Enter") {
      localStorage.removeItem("name");
      dispatch(action.setIsSearching({ isSearching: "name" }));
      dispatch(fetchSearchedName(name, currentPage, itemsPerPage));
      localStorage.setItem("name", name);
    }
  };

  useEffect(() => {
    if (isSearching === "name") {
      dispatch(fetchSearchedName(name, currentPage, itemsPerPage));
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
          onChange={(event) => setName(event.target.value)}
          value={name}
        />
      </span>
    </div>
  );
};

export default SearchByName;

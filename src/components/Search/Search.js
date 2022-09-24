import React from "react";
import classes from "./Search.module.scss";
import SearchByTitle from "./SearchByTitle/SearchByTitle";
import SearchByYear from "./SearchByYear/SearchByYear";
import SearchByProfession from "./SearchByProfession/SearchByProfession";

const Search = (props) => {
  const { type, itemsPerPage, currentPage, action } = props;

  return (
    <div className={classes["search-wrapper"]}>
      <div className={classes["search-box"]}>
        <SearchByTitle
          type={type}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          action={action}
        />
        {type === "movies" && (
          <SearchByYear itemsPerPage={itemsPerPage} currentPage={currentPage} />
        )}
        {type === "crews" && <SearchByProfession />}
      </div>
    </div>
  );
};

export default Search;

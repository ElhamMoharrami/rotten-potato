import React from "react";
import classes from "./Search.module.scss";
import SearchByTitle from "./SearchByTitle/SearchByTitle";
import SearchByName from "./SearchByName/SearchByName";
import SearchByYear from "./SearchByYear/SearchByYear";
import SearchByProfession from "./SearchByProfession/SearchByProfession";

const Search = (props) => {
  const { type, itemsPerPage, currentPage, action, isSearching } = props;

  return (
    <div className={classes["search-wrapper"]}>
      <div className={classes["search-box"]}>
        {type === "movies" ? (
          <SearchByTitle
            isSearching={isSearching}
            action={action}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
          />
        ) : (
          <SearchByName
            action={action}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            isSearching={isSearching}
          />
        )}
        {type === "movies" ? (
          <SearchByYear
            isSearching={isSearching}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            action={action}
          />
        ) : (
          <SearchByProfession
            isSearching={isSearching}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
          />
        )}
      </div>
    </div>
  );
};
//separate movie and crew search
export default Search;

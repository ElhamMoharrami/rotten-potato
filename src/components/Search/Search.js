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
    
        <div>
        <SearchByName/>
        </div>
        <div>
        <SearchByProfession/>
        </div>
      
    </div>
  );
};
//separate movie and crew search
export default Search;

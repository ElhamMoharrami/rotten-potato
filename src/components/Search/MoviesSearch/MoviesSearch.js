import "../../../assets/commonStyle.scss";
import React from "react";
import classes from "./MovieSearch.module.scss";
import Card from "../../UI/Card/Card";
import SearchMovie from "./SearchMovie/SearchMovie";


const MoviesSearch = (props) => {
  const { itemsPerPage, currentPage, isSearching } = props;
  return (
    <Card className={classes["movie-wrapper"]}>
      <SearchMovie
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        isSearching={isSearching}
      />
    </Card>
  );
};

export default MoviesSearch;

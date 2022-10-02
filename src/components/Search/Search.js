import React from "react";

import MoviesSearch from "./MoviesSearch/MoviesSearch";
import CrewSearch from "./CrewSearch/CrewSearch";

const Search = (props) => {
  const { type, itemsPerPage, currentPage, action, isSearching } = props;

  return (
    <>
      {type === "movies" ? (
        <MoviesSearch />
      ) : (
        <CrewSearch
          action={action}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          isSearching={isSearching}
        />
      )}
    </>
  );
};

export default Search;

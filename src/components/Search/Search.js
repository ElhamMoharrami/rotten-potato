import React from "react";
import SearchMovie from "./MoviesSearch/SearchMovie";
import CrewSearch from "./CrewSearch/CrewSearch";

const Search = (props) => {
  const { type, itemsPerPage, currentPage, action, isSearching } = props;

  return (
    <>
      {type === "movies" ? (
        <SearchMovie
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          isSearching={isSearching}
        />
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

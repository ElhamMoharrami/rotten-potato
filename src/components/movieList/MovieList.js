import React, { Fragment, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import MovieCard from "../MovieCard/MovieCard";
import "./MovieList.css";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  const getMovieRequest = async () => {
    const url = "http://www.omdbapi.com/?s=avengers&apikey=bfea6962";

    const response = await fetch(url);
    const data = await response.json();

    setMovies(data.Search);
  };

  useEffect(() => {
    getMovieRequest();
  }, []);

  const ShowMovies = (props) => {
    return (
      <Fragment>
        {props.movies.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </Fragment>
    );
  };

  //pagination

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(movies.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(movies.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, movies]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % movies.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <div className="poster-grid">
        <ShowMovies movies={currentItems} />
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeLinkClassName="active"
      />
    </>
  );
};

export default MovieList;

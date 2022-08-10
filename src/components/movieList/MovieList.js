import React, { Fragment, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import MovieCard from "../MovieCard/MovieCard";
import "./MovieList.css";

const MovieList = () => {
  //defining states
  const [movies, setMovies] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const itemsPerPage = 10;

  //for the first time that the page loads so we have something to show
  //calculates the total number of pages we need for pagination
  useEffect(() => {
    const getMovieRequest = async () => {
      const url = `http://localhost:8080/api/movies?page=1&size=${itemsPerPage}`;
      const response = await fetch(url);
      const data = await response.json();
      const total = data.page.totalElements;
      setPageCount(Math.floor(total / itemsPerPage));
      setMovies(data.content);
    };

    getMovieRequest();
  }, [itemsPerPage]);

  //runs when the page changes
  const fetchMovieRequest = async (currentPage) => {
    const url = `http://localhost:8080/api/movies?page=${currentPage}&size=${itemsPerPage}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.content;
  };

  // Invoke when user click to request another page.
  const handlePageClick = async (event) => {
    let currentPage = event.selected + 1;

    const moviesFormServer = await fetchMovieRequest(currentPage);

    setMovies(moviesFormServer);
    // scroll to the top
    window.scrollTo(0, 0);
  };

  //make a card for each movie
  const ShowMovies = (props) => {
    return (
      <Fragment>
        {props.movies.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </Fragment>
    );
  };

  return (
    <>
      <div className="poster-grid">
        <ShowMovies movies={movies} />
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

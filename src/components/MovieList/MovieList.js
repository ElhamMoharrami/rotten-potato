import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Select from "react-dropdown-select";
import ReactPaginate from "react-paginate";

import { comboActions } from "../../store/combo-slice";
import { dataActions, fetchData } from "../../store/data-slice";

import ShowMovies from "../ShowMovies/ShowMovies";
import "./MovieList.css";

import { MOVIESURL } from "../../assets/apis/config";
import { pageRangeDisplayed } from "../../assets/apis/config";

const MovieList = () => {
  const dispatch = useDispatch();

  const itemsPerPage = useSelector((state) => state.combo.itemsPerPage);
  const movies = useSelector((state) => state.data.data);
  const pageCount = useSelector((state) => state.data.pageCount);
  const currentPage = useSelector((state) => state.combo.currentPage);
  const options = useSelector((state) => state.combo.options);

  useEffect(() => {
    const getMovieRequest = async () => {
      dispatch(
        fetchData(`${MOVIESURL}?page=${currentPage - 1}&size=${itemsPerPage}`)
      );
    };
    getMovieRequest();
    dispatch(dataActions.clearData());
  }, [itemsPerPage, dispatch, currentPage]);

  const handlePageClick = async (event) => {
    dispatch(comboActions.changeCurrentPage(event.selected + 1));
  };

  const itemsPerPageHandler = (selectedOption) => {
    const selectedOpt = selectedOption[0].value;
    dispatch(comboActions.changeItemsPerPage(selectedOpt));
  };

  const dropdownOpenHandler = () => {
    dispatch(comboActions.dropdownOpenHandler());
  };

  const dropdownCloseHandler = () => {
    dispatch(comboActions.dropdownCloseHandler());
  };

  return (
    <>
      <div className="poster-grid">
        <ShowMovies movies={movies} />
      </div>

      <div className="pag-select">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={pageRangeDisplayed}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="active"
        />
        <Select
          placeholder="select..."
          options={options}
          onChange={itemsPerPageHandler}
          searchable={false}
          closeOnSelect={true}
          onDropdownOpen={dropdownOpenHandler}
          onDropdownClose={dropdownCloseHandler}
        />
      </div>
    </>
  );
};

export default MovieList;

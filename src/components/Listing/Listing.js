import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Select from "react-dropdown-select";
import ReactPaginate from "react-paginate";

import { dataActions, fetchData } from "../../store/data-slice";

import "./Listing.css";
import { options } from "../../assets/apis/config";

import { pageRangeDisplayed } from "../../assets/apis/config";

const Listing = (props) => {
  const [currentPage, setCurrentPage] = useState();
  const [itemsPerPage, setItemsPerPage] = useState();
  const dispatch = useDispatch();

  const pageCount = useSelector((state) => state.data.pageCount);

  useEffect(() => {
    const getDataRequest = async () => {
      dispatch(
        fetchData(`${props.url}?page=${currentPage - 1}&size=${itemsPerPage}`)
      );
    };

    getDataRequest();

    dispatch(dataActions.clearData());
  }, [itemsPerPage, dispatch, currentPage]);

  const handlePageClick = async (event) => {
    setCurrentPage(event.selected + 1);
  };

  const itemsPerPageHandler = (selectedOption) => {
    const selectedOpt = selectedOption[0].value;

    setItemsPerPage(selectedOpt);
  };

  const dropdownOpenHandler = () => {
    window.scrollTo({
      left: 0,
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  const dropdownCloseHandler = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
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

export default Listing;

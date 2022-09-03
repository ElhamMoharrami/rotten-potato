import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import Select from "react-dropdown-select";
import ReactPaginate from "react-paginate";

import { fetchData } from "../../store/api-call";
import ShowList from "../ShowList/ShowList";

import classes from "./ListData.module.css";
import { override } from "../../assets/apis/config";

import { PacmanLoader } from "react-spinners";

const ListData = (props) => {
  const { type } = props;
  const [currentPage, setCurrentPage] = useState();
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const pageRangeDisplayed = 3;
  const options = [
    { value: 5, label: "5" },
    { value: 10, label: "10" },
    { value: 15, label: "15" },
    { value: 20, label: "20" },
  ];
  const dispatch = useDispatch();

  useEffect(() => {
    const getDataRequest = async () => {
      dispatch(fetchData(type, itemsPerPage, currentPage, props.action));
      window.scrollTo(0, 0);
    };

    getDataRequest();
  }, [itemsPerPage, dispatch, currentPage, props.action, type]);

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
  console.log(props.isLoading);
  return (
    <>
      <div className={classes["spinner"]}>
        {props.isLoading && (
          <PacmanLoader color="gray" cssOverride={override} size={150} />
        )}
      </div>

      <ShowList data={props.data.content} card={props.card} />
      <div className={classes["pag-select"]}>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={pageRangeDisplayed}
          pageCount={props.data.pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          containerClassName={classes["pagination"]}
          pageLinkClassName={classes["page-num"]}
          previousLinkClassName={classes["page-num"]}
          nextLinkClassName={classes["page-num"]}
          activeLinkClassName={classes["active"]}
        />

        {!props.isLoading && (
          <Select
            placeholder="select..."
            options={options}
            onChange={itemsPerPageHandler}
            searchable={false}
            closeOnSelect={true}
            onDropdownOpen={dropdownOpenHandler}
            onDropdownClose={dropdownCloseHandler}
          />
        )}
      </div>
    </>
  );
};

export default ListData;

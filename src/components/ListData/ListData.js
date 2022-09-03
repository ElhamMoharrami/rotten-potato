import React, { useEffect, useState } from "react";
import { useDispatch} from "react-redux";

import Select from "react-dropdown-select";
import ReactPaginate from "react-paginate";

import { fetchData } from "../../store/api-call";
import ShowList from "../ShowList/ShowList";

import classes from "./ListData.module.css";
import { options } from "../../assets/apis/config";

import { pageRangeDisplayed } from "../../assets/apis/config";


const ListData = (props) => {
  const { type } = props;
  const [currentPage, setCurrentPage] = useState();
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    const getDataRequest = async () => {
      dispatch(fetchData(type, itemsPerPage, currentPage, props.action));
      window.scrollTo(0, 0);
    };

    getDataRequest();
  }, [itemsPerPage, dispatch, currentPage, props.action, type, isLoading]);

  useEffect(() => {
    setIsLoading(false);
  }, [isLoading]);

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

  console.log(isLoading);
  return (
    <>
     
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

        {!isLoading && (
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

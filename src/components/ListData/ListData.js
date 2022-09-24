import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import Select from "react-dropdown-select";
import ReactPaginate from "react-paginate";

import { fetchData } from "../../store/api-call";
import ShowList from "../ShowList/ShowList";

import classes from "./ListData.module.css";
import { override } from "../../assets/apis/config";

import { PacmanLoader } from "react-spinners";
import Button from "../UI/CustomButton";
import { Link } from "react-router-dom";
import Search from "../Search/Search";

const ListData = (props) => {
  const { type, isLoading, data, action, card,sort } = props;

  const pageRangeDisplayed = 3;
  const options = [
    { value: 5, label: "5" },
    { value: 10, label: "10" },
    { value: 15, label: "15" },
    { value: 20, label: "20" },
  ];
  const dispatch = useDispatch();
  const linkCondition = type === "movies" ? `/movieform/add` : "/crewform/add";

  useEffect(() => {
    const getDataRequest = async () => {
      dispatch(fetchData(type, data.itemsPerPage, data.currentPage, action,sort));

      window.scrollTo(0, 0);
    };

    getDataRequest();
  }, [data.itemsPerPage, dispatch, data.currentPage, action, type]);

  const handlePageClick = async (event) => {
    dispatch(action.setCurrentPage({ currentPage: event.selected + 1 }));
  };

  const itemsPerPageHandler = (selectedOption) => {
    const selectedOpt = selectedOption[0].value;

    dispatch(action.setItemsPerPage({ itemsPerPage: selectedOpt }));
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
      <div className={classes["spinner"]}>
        {isLoading && (
          <PacmanLoader color="gray" cssOverride={override} size={150} />
        )}
      </div>
      <Search
        type={type}
        itemsPerPage={data.itemsPerPage}
        currentPage={data.currentPage}
        action={action}
      />
      <ShowList data={data.content} card={card} />
      <div className={classes["pag-select"]}>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={pageRangeDisplayed}
          pageCount={data.pageCount}
          previousLabel="< previous"
          initialPage={data.currentPage - 1}
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
            className={classes["select"]}
            options={options}
            onChange={itemsPerPageHandler}
            searchable={false}
            closeOnSelect={true}
            onDropdownOpen={dropdownOpenHandler}
            onDropdownClose={dropdownCloseHandler}
          />
        )}
        {!isLoading && (
          <Link to={linkCondition}>
            <Button>Add </Button>
          </Link>
        )}
      </div>
    </>
  );
};

export default ListData;

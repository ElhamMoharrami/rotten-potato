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
import Card from "../UI/Card/Card";

const ListData = (props) => {
  const { type, isLoading, data, action, card, isSearching } = props;

  const pageRangeDisplayed = 3;
  const options = [
    { value: 5, label: "5" },
    { value: 10, label: "10" },
    { value: 15, label: "15" },
    { value: 20, label: "20" },
  ];
  const dispatch = useDispatch();
  const linkCondition = type === "movies" ? `/movie/add` : "/crew/add";

  useEffect(() => {
    if (isSearching === "") {
      dispatch(fetchData(type, data.itemsPerPage, data.currentPage, action));
      window.scrollTo(0, 0);
    }
  }, [
    data.itemsPerPage,
    dispatch,
    data.currentPage,
    action,
    type,
    isSearching,
  ]);

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
      <div className={classes["container"]}>
        <div className={classes["search-container"]}>
          <Search
            type={type}
            itemsPerPage={data.itemsPerPage}
            currentPage={data.currentPage}
            action={action}
            isSearching={isSearching}
          />
        </div>
        <div>
          {data.content.length > 1 ? (
            <ShowList data={data.content} card={card} />
          ) : (
            <Card className={classes["search-message"]}>
              <p className={classes["no-result"]}>
                The term you entered did not bring any results.
              </p>
            </Card>
          )}
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

            {!isLoading && data.content.length > 1 && (
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
            {!isLoading && data.content.length > 1 && (
              <Link to={linkCondition}>
                <Button>Add </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ListData;

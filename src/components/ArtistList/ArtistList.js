import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Select from "react-dropdown-select";
import ReactPaginate from "react-paginate";

import { comboActions } from "../../store/combo-slice";
import { fetchData } from "../../store/data-slice";

import ArtistCard from "../ArtistCard/ArtistCard";
import "./ArtistList.css";

const ArtistList = () => {
  const dispatch = useDispatch();

  const itemsPerPage = useSelector((state) => state.combo.itemsPerPage);
  const artists = useSelector((state) => state.data.data);
  const pageCount = useSelector((state) => state.data.pageCount);
  const currentPage = useSelector((state) => state.combo.currentPage);
  const options = useSelector((state) => state.combo.options);

  useEffect(() => {
    const getArtistRequest = async () => {
      const url = `http://localhost:8080/api/crews?page=${
        currentPage - 1
      }&size=${itemsPerPage}`;
      dispatch(fetchData(url));
    };
    getArtistRequest();
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

  const ShowArtists = (props) => {
    return (
      <Fragment>
        {props.artists.map((artist, index) => (
          <ArtistCard key={index} artist={artist} />
        ))}
      </Fragment>
    );
  };

  return (
    <>
      <div className="poster-grid">
        <ShowArtists artists={artists} />
      </div>
      <div className="pag-select">
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

export default ArtistList;

import React, { Fragment, useEffect, useState } from "react";
import Select from "react-dropdown-select";
import ReactPaginate from "react-paginate";

import ArtistCard from "../ArtistCard/ArtistCard";
import "./ArtistList.css";

const ArtistList = () => {
  //defining states
  const [artists, setArtists] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemsPerPage,setItemsPerPage]=useState(10)

  const options=[{value:5,label:'five items per page'},{value:10,label:'ten items per page'},{value:15,label:'fifteen items per page'},{value:20,label:'twenty items per page'}]

  //change items per page on select
const itemsPerPageHandler=(selectedOption)=>{
  setItemsPerPage(selectedOption[0].value)
}


  //for the first time that the page loads so we have something to show
  //calculates the total number of pages we need for pagination
  useEffect(() => {
    const getArtistRequest = async () => {
      const url = `http://localhost:8080/api/crews?page=1&size=${itemsPerPage}`;
      
      const response = await fetch(url);
      const data = await response.json();
      const total = data.page.totalElements;
      setPageCount(Math.floor(total / itemsPerPage));
      setArtists(data.content);
    };

    getArtistRequest();
  }, [itemsPerPage]);

  //runs when the page changes
  const fetchArtistRequest = async (currentPage) => {
    const url = `http://localhost:8080/api/crews?page=${currentPage}&size=${itemsPerPage}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.content;
  };

  // Invoke when user click to request another page.
  const handlePageClick = async (event) => {
    let currentPage = event.selected + 1;

    const artistsFormServer = await fetchArtistRequest(currentPage);

    setArtists(artistsFormServer);
    // scroll to the top
    window.scrollTo(0, 0);
  };

  //invoke when dropdown opens
  const dropdownOpenHandler=()=>{
    window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
  }

  //invoke when dropdown closes
  const dropdownCloseHandler=()=>{
    window.scrollTo(0, 0);
  }

  //make a card for each movie
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
      placeholder={'choose number of items per page '} 
      options={options}
       onChange={itemsPerPageHandler} 
       searchable={false}
       closeOnSelect={true}
       onDropdownOpen={dropdownOpenHandler}
       onDropdownClose={dropdownCloseHandler}
       />
    </>
  );
};

export default ArtistList;

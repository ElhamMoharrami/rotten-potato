import React, { Fragment } from "react";
import { useSelector } from "react-redux";

import ShowMovies from "../components/ShowMovies/ShowMovies";
import Listing from "../components/Listing/Listing";

import { MOVIESURL } from "../assets/apis/config";
import "../assets/commonStyle.css";

const Movies = () => {
  const movies = useSelector((state) => state.data.data);
  return <>
    <div className="poster-grid">
        <ShowMovies movies={movies} />
      </div>
<Listing url={MOVIESURL}/>
  </>
};

export default Movies;

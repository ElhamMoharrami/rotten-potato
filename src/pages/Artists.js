import React, { Fragment } from "react";
import { useSelector } from "react-redux";

import ShowArtists from '../components/ShowArtists/ShowArtists'
import Listing from "../components/Listing/Listing";

import { ARTISTSURL } from "../assets/apis/config";

const Artists = () => {
  const artists = useSelector((state) => state.data.data);
  return <>
    <div className="poster-grid">
        <ShowArtists artists={artists} />
      </div>
<Listing url={ARTISTSURL}/>
  </>
};

export default Artists;

import React, { Fragment } from "react";
import ArtistCard from "../ArtistCard/ArtistCard";

const ShowArtists = (props) => {
  return (
    <Fragment>
      {props.artists.map((artist, index) => (
        <ArtistCard key={index} artist={artist} />
      ))}
    </Fragment>
  );
};

export default ShowArtists;

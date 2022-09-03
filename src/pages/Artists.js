import React, { Fragment } from "react";
import { useSelector } from "react-redux";

import ListData from "../components/ListData/ListData";
import ArtistCard from "../components/ArtistCard/ArtistCard";

import { artistActions } from "../store/data-slice";

const Artists = () => {
  const data = useSelector((state) => state.crews.data);

  const card = (item) => {
    return <ArtistCard artist={item} key={item.id} />;
  };
  return (
    <>
      <ListData type={`crews`} data={data} card={card} action={artistActions}  />
    </>
  );
};

export default Artists;

import React from "react";
import { useSelector } from "react-redux";

import ListData from "../components/ListData/ListData";
import ArtistCard from "../components/ArtistCard/ArtistCard";

import { artistActions } from "../store/data-slice";

const Artists = () => {
  const data = useSelector((state) => state.crews.data);
  const isLoading = useSelector((state) => state.crews.isLoading);

  const card = (item) => {
    return <ArtistCard artist={item} />;
  };
  return (
    <>
      <ListData
        type={'crews'}
        data={data}
        card={card}
        action={artistActions}
        isLoading={isLoading}
      />
    </>
  );
};

export default Artists;

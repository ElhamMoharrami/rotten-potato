import React from "react";
import { useSelector } from "react-redux";

import ListData from "../components/ListData/ListData";
import ArtistCard from "../components/ArtistCard/ArtistCard";
import classes from "./Artist.module.css";
import { artistActions } from "../store/data-slice";
import CrewSearch from "../components/Search/CrewSearch/CrewSearch";

const Artists = () => {
  const data = useSelector((state) => state.crews.data);
  const isSearching = useSelector((state) => state.crews.isSearching);
  const isLoading = useSelector((state) => state.crews.isLoading);

  const card = (item) => {
    return <ArtistCard artist={item} />;
  };
  return (
    <div className={classes["container"]}>
      <CrewSearch
      className={classes["search-container"]}
        itemsPerPage={data.itemsPerPage}
        currentPage={data.currentPage}
        isSearching={isSearching}
      />
      <ListData
        type={"crews"}
        data={data}
        card={card}
        action={artistActions}
        isLoading={isLoading}
        isSearching={isSearching}
      />
    </div>
  );
};

export default Artists;

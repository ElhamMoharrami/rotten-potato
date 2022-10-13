import React from "react";
import { useSelector } from "react-redux";

import ListData from "../components/ListData/ListData";
import CrewCard from "../components/CrewCard/CrewCard";
import { artistActions } from "../store/data-slice";
import CrewSearch from "../components/Search/CrewSearch/CrewSearch";
import SearchDrawer from "../components/SearchDrawer/SearchDrawer";

const Artists = () => {
  const data = useSelector((state) => state.crews.data);
  const isSearching = useSelector((state) => state.crews.isSearching);
  const isLoading = useSelector((state) => state.crews.isLoading);
  const card = (item) => {
    return <CrewCard artist={item} />;
  };

  return (
    <SearchDrawer
      itemsPerPage={data.page.itemsPerPage}
      currentPage={data.page.currentPage}
      isSearching={isSearching}
      search={
        <CrewSearch
          itemsPerPage={data.page.itemsPerPage}
          currentPage={data.page.currentPage}
          isSearching={isSearching}
        />
      }
      data={
        <ListData
          type="crews"
          data={data}
          card={card}
          action={artistActions}
          isLoading={isLoading}
          isSearching={isSearching}
        />
      }
    />
  );
};

export default Artists;

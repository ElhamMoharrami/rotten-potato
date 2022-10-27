import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import ListData from "../components/ListData/ListData";
import CrewCard from "../components/CrewCard/CrewCard";
import CrewForm from "../components/CrewForm/CrewForm";
import { artistActions } from "../store/data-slice";
import Box from "@mui/material/Box";
import CrewSearch from "../components/Search/CrewSearch/CrewSearch";
import SearchDrawer from "../components/SearchDrawer/SearchDrawer";
import AlertMessage from "../components/Alert/Alert";

const Artists = () => {
  const data = useSelector((state) => state.crews.data);
  const isSearching = useSelector((state) => state.crews.isSearching);
  const isLoading = useSelector((state) => state.crews.isLoading);
  const actionState = useSelector((state) => state.crews.actionState);
  const [openAlert, setOpenAlert] = useState(true);

  const handleCloseAlert = () => setOpenAlert(false);
  const card = (item) => {
    return <CrewCard crew={item} />;
  };

  const form = (close, open) => {
    return <CrewForm open={open} close={close} />;
  };

  return (
    <Box sx={{ marginTop: 10 }}>
      {actionState.status !== "" && (
        <AlertMessage
          openAlert={openAlert}
          handleCloseAlert={handleCloseAlert}
          actionState={actionState}
          title={actionState.title}
          type="crews"
        />
      )}
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
      />
      <ListData
        type="crews"
        data={data}
        card={card}
        action={artistActions}
        isLoading={isLoading}
        isSearching={isSearching}
        form={form}
        itemsPerPage={data.page.itemsPerPage}
        currentPage={data.page.currentPage}
      />
    </Box>
  );
};

export default Artists;

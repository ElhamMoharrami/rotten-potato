import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { style } from "../../assets/config";
import { useDispatch } from "react-redux";
import { fetchCrewTable } from "../../store/api-call";
import { crewTableActions } from "../../store/crewtable-Slice";
import { useSelector } from "react-redux";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 130 },
  { field: "profession", headerName: "Profession", width: 130 },
];

const CrewTable = () => {
  const dispatch = useDispatch();
  const crewData = useSelector((state) => state.crewTable.crew);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    dispatch(fetchCrewTable(crewTableActions));
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Add crew</Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style }}>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={crewData}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
            />
          </div>
          <Button onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default CrewTable;

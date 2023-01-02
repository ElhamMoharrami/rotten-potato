import React from "react";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";

const AlertMessage = (props) => {
  const { openAlert, handleCloseAlert, actionState, title } = props;

  return (
    <Collapse in={openAlert}>
      <Alert
        severity={actionState.status}
        onClose={handleCloseAlert}
      >
        {title} {actionState.action} {actionState.status}
      </Alert>
    </Collapse>
  );
};

export default AlertMessage;

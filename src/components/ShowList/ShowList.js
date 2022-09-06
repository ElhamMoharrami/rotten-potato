import React, { Fragment } from "react";
import "../../assets/commonStyle.css";

const ShowList = (props) => {
  return (
    <div className="poster-grid">
      <Fragment>{props.data.map((item) => props.card(item))}</Fragment>
    </div>
  );
};

export default ShowList;

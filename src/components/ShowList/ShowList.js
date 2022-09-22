import React, { Fragment } from "react";
import "../../assets/commonStyle.scss";

const ShowList = (props) => {
  return (
    <div className="poster-grid">
     <Fragment>{props.data.map((item) => <div key={item.id}>{props.card(item)}</div>)}</Fragment>
    </div>
  );
};

export default ShowList;

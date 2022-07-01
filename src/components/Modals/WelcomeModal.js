import React from "react";
import { useState, useEffect } from "react";

import Modal from "./Modal";
import classes from "./WelcomeModal.module.css";
import cinema from "../../assets/felix-mooneeram-evlkOfkQ5rE-unsplash.jpg";

const WelcomeModal = (props) => {
  // const [visible, setVisible] = useState(false);

  // useEffect(() => {
  //   let modal_status = localStorage.getItem("modal_status");
  //   if (!modal_status) {
  //     setVisible(true);
  //     localStorage.setItem("modal_status", 1);
  //   }
  // }, []);

  // if (!visible) return null;

  return (
    <Modal>
      <div className={classes.wrapper}>
        <h1 className={classes.modalHeader}>welcome to Rotten potato</h1>
        <img className={classes.imagestyle} src={cinema}></img>
      </div>
    </Modal>
  );
};

export default WelcomeModal;

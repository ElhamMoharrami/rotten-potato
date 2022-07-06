import React from "react";
import { useEffect } from "react";
import Modal from "../UI/Modal";
import classes from "./WelcomeModal.module.css";
import cinema from "../../assets/felix-mooneeram-evlkOfkQ5rE-unsplash.jpg";

const WelcomeModal = (props) => {
  const [visible, setVisible] = React.useState(false);

  useEffect(() => {
    let pop_status = localStorage.getItem("pop_status");
    if (!pop_status) {
      setVisible(true);
      localStorage.setItem("pop_status", 1);
    }
  }, []);
  if (!visible) return null;

  return (
    <Modal onClose={() => setVisible(false)}>
      <div className={classes.wrapper}>
        <p className={classes.modalHeader}>welcome to Rotten potato!</p>
        <img
          className={classes.imagestyle}
          src={cinema}
          alt="cinema-picture"
        ></img>
      </div>
      <button className={classes.closeModal} onClick={() => setVisible(false)}>
        Close
      </button>
    </Modal>
  );
};

export default WelcomeModal;

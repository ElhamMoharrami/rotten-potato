import React from "react";
import classes from "./CustomButton.module.css";

const Button = ({ onClick, type, children }) => {
  return (
    <button type={type} onClick={onClick} className={classes["custum-button"]}>
      {children}
    </button>
  );
};

export default Button;

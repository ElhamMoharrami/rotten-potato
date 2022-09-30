import React from "react";
import classes from "./CustomButton.module.css";

const Button = ({ disabled,onClick, type, children }) => {
  return (
    <button disabled={disabled} type={type} onClick={onClick} className={classes["button-33"]}>
      {children}
    </button>
  );
};

export default Button;

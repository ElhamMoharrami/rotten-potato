import React from "react";
import classes from './CustomButton.module.css'

const Button=({ onClick, children })=>{
    return (
        <button type="button" onClick={onClick} className={classes['custum-button']}>
          {children}
        </button>
      );
}

export default Button
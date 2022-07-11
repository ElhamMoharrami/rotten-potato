import React, { Fragment } from "react";

import classes from "../Welcome Landing Page/WelcomeLandingPage.module.css";

const WelcomeLandingPage = () => {
  return (
    <Fragment>
      <div className={classes.backgroundImg}>
        <h1 className={classes.welcomeMsg}>
          Welcome to Rotten ...waite for it...Potato!
        </h1>
      </div>
    </Fragment>
  );
};

export default WelcomeLandingPage;

import React, { Fragment } from "react";

import classes from "./WelcomeLandingPage.module.css";

const WelcomeLandingPage = () => {
  return (
    <Fragment>
      <div className={classes.backgroundImg}>
        <h1 className={classes.welcomeMsg} data-testid="my-test-id">
          Welcome to Rotten ...waite for it...Potato!
        </h1>
      </div>
    </Fragment>
  );
};

export default WelcomeLandingPage;

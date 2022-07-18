import { Fragment } from "react";

import classes from "./Menu.module.css";
import cinema from "../../assets/cinema.jpg";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <div className={classes.title}>
          <h1>Rotten Potato</h1>
        </div>
        <div className={classes.links}>
          <a className={classes.link} href="#">
            Movies
          </a>
          <a className={classes.link} href="#">
            Dramas
          </a>
        </div>
      </header>
      <div className={classes["main-image"]}>
        <img src={cinema} alt="A cinema" />
      </div>
    </Fragment>
  );
};

export default Header;

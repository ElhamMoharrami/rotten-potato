import React from "react";
import classes from './Home.module.css'

const Home = () => {
  return (
    <div className={classes['background-image']}>
      <h1> Welcome to Rotten Potato ! </h1>
      <p>
        A movie rating website. youcan also get to know some of the best artists
        in film industry!
      </p>
    </div>
  );
};

export default Home;

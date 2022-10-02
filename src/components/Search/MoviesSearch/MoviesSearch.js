import "../../../assets/commonStyle.scss";
import React from "react";
import classes from "./MovieSearch.module.scss";
import Button from "../../UI/CustomButton";
import Card from '../../UI/Card/Card';
import MovieSort from "./SortMovie/SortMovie";

const MoviesSearch = (props) => {
  return (
    <Card className={classes["movie-wrapper"]}>
      <div className={classes["title-year-wrapper"]}>
        <form className={classes["title-year-form"]}>
          <div className={classes["title-wrapper"]}>
            <img
              alt="search icon"
              src="https://img.icons8.com/external-line-gradient-kendis-lasman/32/000000/external-search-graphic-design-line-gradient-line-gradient-kendis-lasman.png"
            />
            <span className="input">
              <input
                type="text"
                className="search-input"
                placeholder="search"
              />
            </span>
          </div>
          <div className={classes["year-wrapper"]}>
            <span className="input">
              <input
                className="search-input"
                type="number"
                min="1900"
                max="2022"
                placeholder="from"
              />
            </span>
            <span className="input">
              <input
                className="search-input"
                type="number"
                min="1900"
                placeholder="to"
              />
            </span>
          </div>
          <div className={classes["title-year-search-button"]}>
            <Button type="submit">Search</Button>
          </div>
        </form>
      </div>
     <MovieSort/>
    </Card>
  );
};

export default MoviesSearch;

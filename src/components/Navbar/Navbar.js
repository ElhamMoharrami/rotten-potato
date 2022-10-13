import React from "react";
import { useDispatch } from "react-redux";
import { artistActions, movieActions } from "../../store/data-slice";
import CustomLink from "../UI/CustomLink";
import "./Navbar.css";

const Navbar = () => {
  const dispatch = useDispatch();

  const homeClickHandler = () => {
    localStorage.clear();
  };

  const moviesClickHandler = () => {
    dispatch(movieActions.clearData());
  };

  const crewsClickHandler = () => {
    dispatch(artistActions.clearData());
  };

  return (
    <nav className="nav">
      <h1 className="site-title">Rotten Potato</h1>
      <ul>
        <CustomLink onClick={homeClickHandler} to="/">
          Home
        </CustomLink>
        <CustomLink onClick={moviesClickHandler} to="/Movies">
          Movies
        </CustomLink>
        <CustomLink onClick={crewsClickHandler} to="/Artists">
          Artists
        </CustomLink>
      </ul>
    </nav>
  );
};

export default Navbar;

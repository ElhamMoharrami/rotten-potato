import React from "react";

import CustomLink from "../UI/CustomLink";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="nav">
      <h1 className="site-title">Rotten Potato</h1>
      <ul>
        <CustomLink to="/">Home</CustomLink>
        <CustomLink to="/Movies">Movies</CustomLink>
        <CustomLink to="/Artists">Artists</CustomLink>
      </ul>
    </nav>
  );
};



export default Navbar;

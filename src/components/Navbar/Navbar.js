import React, { Children } from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        Rotten Potato
      </Link>
      <ul>
        <CustomLink to="/Movies">Movies</CustomLink>
        <CustomLink to="/Shows">Shows</CustomLink>
      </ul>
    </nav>
  );
};

const CustomLink = ({ to, children, ...props }) => {
  const path = window.location.pathname;

  return (
    <li className={path === to ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
};

export default Navbar;

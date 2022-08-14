import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="nav">
      <h1  className="site-title">
        Rotten Potato
      </h1>
      <ul>
      <CustomLink to="/" >
       Home
      </CustomLink>
        <CustomLink to="/Movies">Movies</CustomLink>
        <CustomLink to="/Artists">Artists</CustomLink>
      </ul>
    </nav>
  );
};

const CustomLink = ({ to, children, ...props }) => {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
};

export default Navbar;
import React, { Children, useImperativeHandle } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

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

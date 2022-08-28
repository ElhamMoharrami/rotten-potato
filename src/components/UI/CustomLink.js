import { dataActions } from "../../store/data-slice";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

import { useDispatch } from "react-redux";

const CustomLink = ({ to, children, ...props }) => {
  const dispatch = useDispatch();

  const onClickHandler = (event) => {
    event.preventDefault();
    dispatch(dataActions.clearData());
    window.location.reload(false);
  };

  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <li className={isActive ? "active" : ""} onClick={onClickHandler}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
};


export default CustomLink;

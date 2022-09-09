import React from "react";
import { Link } from "react-router-dom";
import { deleteSelectedMovie } from "../../store/api-call";
import { useDispatch } from "react-redux";
import "../../assets/CardStyle.scss";
import classes from './MovieCard.module.css'

const MovieCard = (props) => {
  const { movie } = props;
  const dispatch = useDispatch();

  const deleteHandler = (e) => {
   
    const deleteMovie =async ()=>{
      dispatch(deleteSelectedMovie(movie.id));
    }
   deleteMovie()
     window.location.reload(true);
  };

  return (
    <div className="card-item">
      <Link to={`/Movies/${movie.id}`}>
        <div className="card-inner">
          <div className="card-top">
            <img src={movie.poster} alt={movie.title} />
          </div>
        </div>
        <div className="card-bottom">
          <div className="card-info">
            <h4>{movie.title}</h4>
          </div>
        </div>
      </Link>
      <div className="card-icons">
        <img
          onClick={deleteHandler}
          className={classes['delete-button']}
          src="https://img.icons8.com/clouds/100/000000/delete.png"
        />
        <img src="https://img.icons8.com/clouds/100/000000/edit.png" />
      </div>
    </div>
  );
};

export default MovieCard;

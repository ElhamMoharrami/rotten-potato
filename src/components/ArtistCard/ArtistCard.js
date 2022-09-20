import React from "react";
import { Link } from "react-router-dom";
import blankProfilePicture from "../../assets/images/blankProfilePicture.png";
import {  deleteSelectedItem } from "../../store/api-call";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import "../../assets/commonStyle.css";
import "../../assets/CardStyle.scss";
import { artistActions } from "../../store/data-slice";

const ArtistCard = (props) => {
  const { artist } = props;
  const dispatch = useDispatch();
  const itemsPerPage = useSelector((state) => state.crews.data.itemsPerPage);
  const currentPage = useSelector((state) => state.crews.data.currentPage);
  const content = useSelector((state) => state.crews.data.content);

  const deleteHandler = () => {
  dispatch(deleteSelectedItem(artist.id,"crews", itemsPerPage, currentPage, artistActions, content.length )) 
  };

  return (
    <div className="card-item">
      <Link to={`/Artists/${artist.id}`}>
        <div className="card-inner">
          <div className="card-top">
            {artist.poster !== null && (
              <img src={artist.poster} alt={artist.name} />
            )}
            {artist.poster === null && (
              <img src={blankProfilePicture} alt={artist.name} />
            )}
          </div>
        </div>
        <div className="card-bottom">
          <div className="card-info">
            <h4>{artist.name}</h4>
          </div>
        </div>
      </Link>
      {!props.movieDetail && (
        <div className="card-icons">
          <img
            className="button"
            onClick={deleteHandler}
            src="https://img.icons8.com/material-sharp/24/000000/filled-trash.png"
          />
          <Link to={`/crewform/edit/${artist.id}`}>
            <img
              className="button"
              src="https://img.icons8.com/ios-glyphs/30/000000/edit--v1.png"
            />
          </Link>
        </div>
      )}
    </div>
  );
};

export default ArtistCard;

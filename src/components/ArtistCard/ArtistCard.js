import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "../../assets/CardStyle.scss";
import blankProfilePicture from "../../assets/images/blankProfilePicture.png";

const ArtistCard = (props) => {
  const { artist } = props;

  const professions = artist.profession.split(",");

  const ShowProf = () => {
    return (
      <Fragment>
        {professions.map((prof, index) => (
          <p key={index}>{prof}</p>
        ))}
      </Fragment>
    );
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
            <ShowProf />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ArtistCard;

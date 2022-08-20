import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "./ArtistCard.scss";

const ArtistCard = (props) => {
  const { artist } = props;
  
  const professions=artist.profession.split(',')

  const ShowProf = () => {
    return (
      <Fragment>
        {professions.map((prof,index) => (
          <p key={index}>{prof}</p>
        ))}
      </Fragment>
    );
  };

  return (
    <div className="card-item">
      <Link to={`/`}>
        <div className="card-inner">
          <div className="card-top">
            <img src={artist.poster} alt={artist.name} />
          </div>
        </div>
        <div className="card-bottom">
          <div className="card-info">
            <h4>{artist.name}</h4>
            <ShowProf/>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ArtistCard;
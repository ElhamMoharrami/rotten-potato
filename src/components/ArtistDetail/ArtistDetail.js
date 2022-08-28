import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchDetail, dataActions, fetchMovies } from "../../store/data-slice";
import { ARTISTSURL } from "../../assets/apis/config";
import ShowMovies from "../ShowMovies/ShowMovies";

import classes from "./ArtistDetail.module.css";
import blankProfile from "../../assets/images/blankProfilePicture.png";

const ArtistDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const artist = useSelector((state) => state.data.selectedItem);
  const movies = useSelector((state) => state.data.movies);

  useEffect(() => {
    dispatch(fetchDetail(`${ARTISTSURL}/${id}`));
    dispatch(fetchMovies(`${ARTISTSURL}/${id}/movies`));
    dispatch(dataActions.clearDetail());
  }, [dispatch, id]);

  return (
    <>
      <div className={classes.container}>
        <div className={classes["artist-detail"]}>
          <p className={classes["artist-name"]}>{artist.name}</p>
          <div className={classes["artist-info"]}>
            {artist.birth !== "/" && <span>Birth : {artist.birth}</span>}
            {artist.death !== "\\N" && <span>Death : {artist.death}</span>}
          </div>
          <p className={classes["artist-profession"]}> {artist.profession}</p>
        </div>
        <div>
          {artist.poster !== null && (
            <img
              src={artist.poster}
              alt={artist.title}
              className={classes["artist-poster"]}
            />
          )}
          {artist.poster === null && (
            <img
              src={blankProfile}
              alt={artist.title}
              className={classes["artist-poster-blank"]}
            />
          )}
        </div>
      </div>
      <div className={classes.movies}>
        <p className={classes["movie-title"]}>Movies</p>
        <div className={classes["poster-grid"]}>
          <ShowMovies movies={movies} />
        </div>
      </div>
    </>
  );
};

export default ArtistDetail;

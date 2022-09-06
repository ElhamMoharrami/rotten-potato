import React from "react";
import MovieCard from "../../components/MovieCard/MovieCard";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchDetail, fetchDetailList } from "../../store/api-call";
import ShowList from "../../components/ShowList/ShowList";

import classes from "./ArtistDetail.module.css";
import blankProfile from "../../assets/images/blankProfilePicture.png";
import { artistActions } from "../../store/data-slice";

const ArtistDetail = () => {
  const card = (item) => {
    return <MovieCard movie={item} key={item.id} />;
  };

  const { id } = useParams();
  const dispatch = useDispatch();

  const artist = useSelector((state) => state.crews.selectedItem);
  const movies = useSelector((state) => state.crews.detailList);

  useEffect(() => {
    dispatch(fetchDetail(id, "crews", artistActions));
    dispatch(fetchDetailList(id, "crews", "movies", artistActions));
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
        <ShowList data={movies} card={card} />
      </div>
    </>
  );
};

export default ArtistDetail;

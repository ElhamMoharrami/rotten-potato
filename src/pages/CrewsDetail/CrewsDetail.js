import React from "react";
import MovieCard from "../../components/MovieCard/MovieCard";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchDetail, fetchDetailList } from "../../store/api-call";
import Carousel from "react-multi-carousel";
import { responsive } from "../../assets/apis/config";

import classes from "./CrewsDetail.module.css";
import "../../assets/commonStyle.scss";
import blankProfile from "../../assets/images/blankProfilePicture.png";
import { artistActions } from "../../store/data-slice";

const CrewsDetail = () => {
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
        <p className={classes["movie-title"]}>movies</p>
        <div className="carousel-container">
          <Carousel
            swipeable={false}
            draggable={false}
            showDots={true}
            responsive={responsive}
            ssr={true}
            infinite={false}
            autoPlaySpeed={1000}
            keyBoardControl={true}
            customTransition="all .5"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
          >
            {movies.map((item) => (
              <MovieCard artistDetail={true} movie={item} key={item.id} />
            ))}
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default CrewsDetail;

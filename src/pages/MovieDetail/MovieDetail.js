import React from "react";

import ArtistCard from "../../components/ArtistCard/ArtistCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchDetail, fetchDetailList } from "../../store/api-call";

import classes from "./MovieDetail.module.css";

import { movieActions } from "../../store/data-slice";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "../../assets/apis/config";
import '../../assets/commonStyle.scss'

const MovieDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const movie = useSelector((state) => state.movies.selectedItem);
  const artists = useSelector((state) => state.movies.detailList);

  useEffect(() => {
    dispatch(fetchDetail(id, "movies", movieActions));
    dispatch(fetchDetailList(id, "movies", "crews", movieActions));

  }, [dispatch, id]);

  return (
    <>
      <div className={classes.container}>
        <div className={classes.details}>
          <p className={classes["movie-title"]}>{movie.title}</p>
          <div className={classes["movie-rating"]}>
            <span>
            <img src="https://img.icons8.com/tiny-color/16/000000/star.png"/>   IMDB Rating <i></i> : {movie.imdbRating}
            </span>
            <span>
              IMDB Votes <i></i> : {movie.imdbVotes}
            </span>
            <span>
              Runtime <i></i> : {movie.runtime}
            </span>
            <span>
              Year <i></i> : {movie.year}
            </span>
          </div>
          <p className={classes["movie-plot"]}>{movie.plot}</p>
          <div className={classes["movie-info"]}>
            <div>
              <span>Director</span>
              <span>{movie.director}</span>
            </div>
            <div>
              <span>Stars</span>
              <span>{movie.actors}</span>
            </div>
            <div>
              <span>Generes</span>
              <span>{movie.genre}</span>
            </div>
            <div>
              <span>Languages</span>
              <span>{movie.language}</span>
            </div>
            <div>
              <span>Awards</span>
              <span>{movie.awards}</span>
            </div>
          </div>
        </div>
        <div>
          <img
            src={movie.poster}
            alt={movie.title}
            className={classes["movie-poster"]}
          />
        </div>
      </div>
      <div className={classes.crew}>
        <p className={classes["crew-title"]}>Movie Crew</p>
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
            {artists.map((item) => (
              <ArtistCard movieDetail={true} artist={item} key={item.id} />
            ))}
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default MovieDetail;

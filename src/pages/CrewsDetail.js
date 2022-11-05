import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchDetail, fetchDetailList } from "../store/api-call";
import { artistActions } from "../store/data-slice";
import MovieCard from "../components/MovieCard/MovieCard";
import { Card, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "../assets/config";
import blankProfile from "../assets/images/blankProfilePicture.png";

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
    <Box sx={{ width: "100%" }}>
      <Card
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: "80px",
          margin: "80px 10px 10px 10px",
        }}
      >
        <Box sx={{ marginLeft: "2%", marginTop: "2%" }}>
          <Typography sx={{ color: "black" }}>{artist.name}</Typography>
          <Box sx={{ marginRight: "20px" }}>
            {artist.birth !== "/" && <span>Birth : {artist.birth}</span>}
            {artist.death !== "\\N" && <span>Death : {artist.death}</span>}
          </Box>
          <Typography sx={{ color: "black" }}>{artist.profession}</Typography>
        </Box>
        <Box>
          {artist.poster !== null && (
            <img src={artist.poster} alt={artist.title} />
          )}
          {artist.poster === null && (
            <img src={blankProfile} alt={artist.title} />
          )}
        </Box>
      </Card>
      <Box>
        <Typography
          sx={{
            padding: "20px",
            boxShadow:
              "rgba(114, 100, 165, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
          }}
        >
          movies
        </Typography>
        <Box sx={{ margin: "10px", overflow: "hidden" }}>
          <Carousel
            swipeable={false}
            responsive={responsive}
            ssr={true}
            infinite={true}
            autoPlaySpeed={1000}
            keyBoardControl={true}
            customTransition="all .5"
            transitionDuration={500}
            removeArrowOnDeviceType={["tablet", "mobile"]}
            itemClass="carousel-item-padding-40-px"
          >
            {movies.map((item) => (
              <MovieCard artistDetail={true} movie={item} key={item.id} />
            ))}
          </Carousel>
        </Box>
      </Box>
    </Box>
  );
};

export default CrewsDetail;

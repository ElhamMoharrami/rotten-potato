import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchDetail, fetchDetailList } from "../../store/api-call";
import { movieActions } from "../../store/data-slice";
import CrewCard from "../../components/CrewCard/CrewCard";
import { Card, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "../../assets/config";

const MovieDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.movies.selectedItem);
  const crews = useSelector((state) => state.movies.detailList);

  useEffect(() => {
    dispatch(fetchDetail(id, "movies", movieActions));
    dispatch(fetchDetailList(id, "movies", "crews", movieActions));
  }, [dispatch, id]);

  return (
    <Box>
      <Card
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: "80px",
          margin: "80px 10px 10px 10px",
        }}
      >
        <Box sx={{ margin: "10px" }}>
          <Typography sx={{ fontSize: "25px" }}>{movie.title}</Typography>
          <Box
            sx={{
              paddingLeft: "3px",
              marginTop: "20px",
              fontSize: "24px",
              display: "flex",

              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>
              <img src="https://img.icons8.com/tiny-color/16/000000/star.png" />
              IMDB Rating <i></i>: {movie.imdbRating}
            </span>
            <span>
              IMDB Votes <i></i>: {movie.imdbVotes}
            </span>
            <span>
              Runtime <i></i> : {movie.runtime}
            </span>
            <span>
              Year <i></i> : {movie.year}
            </span>
          </Box>
          <Typography sx={{ margin: "20px" }}>{movie.plot}</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "30px",
            }}
          >
            <Box sx={{ display: "flex", gap: "20px" }}>
              <span>Director</span>
              <span>{movie.director}</span>
            </Box>
            <Box sx={{ display: "flex", gap: "20px" }}>
              <span>Stars</span>
              <span>{movie.actors}</span>
            </Box>
            <Box sx={{ display: "flex", gap: "20px" }}>
              <span>Generes</span>
              <span>{movie.genre}</span>
            </Box>
            <Box sx={{ display: "flex", gap: "20px" }}>
              <span>Languages</span>
              <span>{movie.language}</span>
            </Box>
            <Box sx={{ display: "flex", gap: "20px" }}>
              <span>Awards</span>
              <span>{movie.awards}</span>
            </Box>
          </Box>
        </Box>
        <Box>
          <img src={movie.poster} alt={movie.title} />
        </Box>
      </Card>
      <Box>
        <Typography
          sx={{
            fontSize: "28px",
            marginLeft: "20px",
            marginRight: "20px",
            alignContent: "center",
            paddingLeft: "20px",

            boxShadow:
              "rgba(114, 100, 165, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
          }}
        >
          Movie Crew
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
            {crews.map((item) => (
              <CrewCard movieDetail={true} crew={item} key={item.id} />
            ))}
          </Carousel>
        </Box>
      </Box>
    </Box>
  );
};

export default MovieDetail;

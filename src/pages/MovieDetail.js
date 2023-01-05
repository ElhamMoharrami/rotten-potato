import { useEffect } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchDetail, fetchDetailList, fetchReviews } from "../store/api-call";
import { movieActions } from "../store/data-slice";
import CrewCard from "../components/CrewCard/CrewCard";
import { Card, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "../assets/config";
import UserReview from "../components/UserReview/UserReview";
import Button from "@mui/material/Button";
import AlertMessage from "../components/Alert/Alert";
import { reviewsActions } from "../store/reviews-slice";
import ReviewCard from "../components/ReviewCard/ReviewCard";

const MovieDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.movies.selectedItem);
  const crews = useSelector((state) => state.movies.detailList);
  const account = useSelector((state) => state.login.account);
  const reviews = useSelector((state) => state.reviews.reviews);
  const actionState = useSelector((state) => state.reviews.actionState);
  const openAlert = useSelector((state) => state.reviews.openAlert);
  const [expanded, setExpanded] = React.useState(false);

  const halfReviewsLength = Math.ceil(reviews.length / 2);
  const reviewsForDisplay = expanded
    ? reviews
    : reviews.slice(0, halfReviewsLength);

  const handleCloseAlert = () => {
    dispatch(reviewsActions.setOpenAlert({ openAlert: false }));
  };

  useEffect(() => {
    dispatch(fetchDetail(id, "movies", movieActions));
    dispatch(fetchDetailList(id, "movies", "crews", movieActions));
    dispatch(fetchReviews(id));
  }, [dispatch, id]);

  return (
    <Box>
      {actionState.status !== "" && (
        <AlertMessage
          openAlert={openAlert}
          handleCloseAlert={handleCloseAlert}
          actionState={actionState}
          title={actionState.title}
        />
      )}
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
              justifyContent: "space-between",
            }}
          >
            <span>
              <img
                src="https://img.icons8.com/tiny-color/16/000000/star.png"
                alt="star icon"
              />
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
      <Box
        sx={{
          fontSize: "28px",
          marginLeft: "20px",
          marginRight: "20px",
          marginBottom: "30px",
          marginTop: "30px",
          alignContent: "center",

          boxShadow:
            "rgba(114, 100, 165, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
        }}
      >
        <UserReview movieId={id} userId={account.id} />
      </Box>
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
        <Box sx={{ margin: "10px" }}>
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
      {reviews.length > 1 && (
        <Box sx={{ marginTop: "20px" }}>
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
            Reviews
          </Typography>
          <Box sx={{ marginTop: "20px" }}>
            <React.Fragment>
              {reviewsForDisplay.map((item) => (
                <ReviewCard data={item} key={item.id} />
              ))}
              {reviews.length > 1 && (
                <Button
                  type="button"
                  onClick={() => setExpanded(!expanded)}
                  fullWidth
                  variant="text"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {expanded ? "Show Less" : "Show More"}
                </Button>
              )}
            </React.Fragment>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default MovieDetail;

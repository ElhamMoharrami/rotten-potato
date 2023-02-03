import { useEffect,useState } from "react";
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
import Grid from "@mui/material/Unstable_Grid2";

const MovieDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.movies.selectedItem);
  const crews = useSelector((state) => state.movies.detailList);
  const movieCrews = crews.filter((item) => item.id);

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
      <Card sx={{ margin: "10px" }}>
        <Grid container>
          <Grid
            item
            container
            direction="column"
            alignItems="flex-start"
            xs={9}
          >
            <Grid
              sx={{
                m: "20px",
              }}
              item
              container
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
              gap="20px"
            >
              <Grid item>
                <img
                  src="https://img.icons8.com/tiny-color/16/000000/star.png"
                  alt="star icon"
                />
                IMDB Rating <i></i>: {movie.imdbRating}
              </Grid>
              <Grid item>
                <Typography> IMDB Votes : {movie.imdbVotes}</Typography>
              </Grid>
              <Grid item>
                <Typography> Runtime : {movie.runtime}</Typography>
              </Grid>
              <Grid item>
                <Typography> Year : {movie.year}</Typography>
              </Grid>
            </Grid>

            <Grid
              sx={{
                m: "20px",
              }}
              item
            >
              <Typography>{movie.plot}</Typography>
            </Grid>
            <Grid
              sx={{
                m: "20px",
              }}
              item
              container
              direction="column"
              justifyContent="space-between"
              alignItems="flex-start"
              gap="10px"
            >
              <Grid item>
                <Typography>
                  Director : <span>{movie.director}</span>
                </Typography>
              </Grid>
              <Grid item>
                <Typography>
                  Stars : <span>{movie.actors}</span>
                </Typography>
              </Grid>
              <Grid item>
                <Typography>Generes : {movie.genre}</Typography>
              </Grid>
              <Grid item>
                <Typography>
                  Languages : <span>{movie.language}</span>
                </Typography>
              </Grid>
              <Grid item>
                <Typography>Awards : {movie.awards}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Box
              component="img"
              sx={{
                float: "right",
                height: "250px",
                width: "250px",
              }}
              src={movie.poster}
              alt={movie.title}
            />
          </Grid>
        </Grid>
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
            padding: "10px",
            boxShadow:
              "rgba(114, 100, 165, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
          }}
          align="center"
        >
          Movies
        </Typography>
        <Box sx={{ margin: "10px 10px 0 10px" }}>
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
            {movieCrews.map((item, index) => (
              <CrewCard movieDetail={true} crew={item} key={index} />
            ))}
          </Carousel>
        </Box>
        {movieCrews.length === 0 && (
          <Box>
            <Typography
              sx={{
                fontSize: 14,
                textAlign: " center",
                verticalAlign: "middle",
                lineHeight: "90px",
              }}
              color="text.secondary"
              gutterBottom
            >
              There is no crews for <span>{movie.title}</span>.
            </Typography>
          </Box>
        )}
      </Box>
      {reviews.length >= 1 && (
        <Box sx={{ marginTop: "20px" }}>
          <Typography
            sx={{
              padding: "10px",
              boxShadow:
                "rgba(114, 100, 165, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
            }}
            align="center"
          >
            Reviews
          </Typography>
          <Box sx={{ marginTop: "20px" }}>
            {reviewsForDisplay.map((item, index) => (
              <ReviewCard data-testid="review-data" data={item} key={index} />
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
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default MovieDetail;

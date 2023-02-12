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
import Grid from "@mui/material/Unstable_Grid2";
import { responsive } from "../assets/config";
import blankProfile from "../assets/images/blankProfilePicture.png";
import { Item } from "../assets/config";

const CrewsDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const artist = useSelector((state) => state.crews.selectedItem);
  const movies = useSelector((state) => state.crews.detailList);
  const artistMovies = movies.filter((item) => item.id);

  useEffect(() => {
    dispatch(fetchDetail(id, "crews", artistActions));
    dispatch(fetchDetailList(id, "crews", "movies", artistActions));
  }, [dispatch, id]);

  return (
   <Item>
      <Card>
        <Grid container alignItems="stretch">
          <Grid
            xs={6}
            container
            direction="column"
            justifyContent="space-between"
            alignItems="flex-start"
            item
          >
            <Grid
              item
              sx={{
                m: "20px",
              }}
            >
              <Typography>{artist.name}</Typography>
            </Grid>
            <Grid
              item
              sx={{
                m: "20px",
              }}
            >
              <Typography>{artist.birth}</Typography>
            </Grid>
            <Grid
              item
              sx={{
                m: "20px",
              }}
            >
              <Typography>{artist.profession}</Typography>
            </Grid>
          </Grid>
          <Grid xs={6} item>
            <Box
              component="img"
              sx={{
                float: "right",
                height: "250px",
                width: "250px",
              }}
              src={artist.poster !== null ? artist.poster : blankProfile}
              alt={artist.title}
            />
          </Grid>
        </Grid>
      </Card>

      <Box>
        <Typography
          sx={{
            padding: "10px",
            boxShadow:
              "rgba(114, 100, 165, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
          }}
        >
          movies
        </Typography>
        <Box>
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
              {artistMovies.map((item) => (
                <MovieCard artistDetail={true} movie={item} key={item.id} />
              ))}
            </Carousel>
          </Box>

          {artistMovies.length === 0 && (
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
                There is no movie for <span>{artist.name}</span>.
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
      </Item>
  );
};

export default CrewsDetail;

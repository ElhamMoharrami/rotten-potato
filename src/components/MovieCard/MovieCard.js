import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSelectedItem } from "../../store/api-call";
import { movieActions } from "../../store/data-slice";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const MovieCard = (props) => {
  const { movie } = props;
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.movies.data.currentPage);
  const itemsPerPage = useSelector((state) => state.movies.data.itemsPerPage);
  const content = useSelector((state) => state.movies.data.content);

  const deleteHandler = () => {
    dispatch(
      deleteSelectedItem(
        movie.id,
        "movies",
        itemsPerPage,
        currentPage,
        movieActions,
        content.length
      )
    );
    console.log(content.length);
  };

  return (
    <Card sx={{ height: 510, borderRadius: "20px", position: "relative" }}>
      <Link to={`/movies/${movie.id}`}>
        <CardMedia
          component="img"
          alt={movie.title}
          height="340"
          image={movie.poster}
        />
        <CardContent>
          <Typography
            sx={{ fontSize: 18, color: "black" }}
            gutterBottom
            variant="h5"
            component="div"
          >
            {movie.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {movie.year}
          </Typography>
        </CardContent>
      </Link>
      <CardActions sx={{ position: "absolute", bottom: 0 }}>
        <DeleteIcon onClick={deleteHandler} />
        <Link to={`/movies/edit/${movie.id}`}>
          <EditIcon sx={{ color: "black", marginLeft: 20 }} />
        </Link>
      </CardActions>
    </Card>
  );
};

export default MovieCard;

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSelectedItem } from "../../store/api-call";
import { movieActions } from "../../store/data-slice";
import MovieForm from "../MovieForm/MovieForm";
import { Link as LinkRouter } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Confirmation from "../Confirmation/Confirmation";

const style = { textDecoration: "none" };

const MovieCard = (props) => {
  const { artistDetail, numberOfItemsOnPage } = props;
  const { movie } = props;
  const dispatch = useDispatch();
  const currentPage = useSelector(
    (state) => state.movies.data.page.currentPage
  );
  const itemsPerPage = useSelector((state) => state.login.account.itemsPerPage);
  const account = useSelector((state) => state.login.account);
  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenConfirm = () => setOpenConfirm(true);
  const handleCloseConfirm = () => setOpenConfirm(false);

  const deleteHandler = () => {
    dispatch(
      deleteSelectedItem(
        movie.id,
        movie.title,
        "movies",
        itemsPerPage,
        currentPage,
        movieActions,
        numberOfItemsOnPage
      )
    );
    dispatch(movieActions.setOpenAlert({ openAlert: true }));
  };

  return (
    <Card
      sx={{
        height: 510,
        borderRadius: "20px",
        position: "relative",
        width: "240px",
      }}
    >
      <LinkRouter style={style} to={`/movies/${movie.id}`}>
        <CardMedia
          component="img"
          alt={movie.title}
          height="340"
          image={movie.poster}
        />
        <CardContent>
          <Typography
            sx={{ fontSize: 18 }}
            gutterBottom
            variant="h5"
            component="div"
            color="text.primary"
          >
            {movie.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {movie.year}
          </Typography>
        </CardContent>
      </LinkRouter>

      {!artistDetail && account.role === "ADMIN" && (
        <CardActions
          sx={{
            position: "absolute",
            bottom: 0,
            display: "flex",
            gap: "150px",
          }}
        >
          <DeleteIcon onClick={handleOpenConfirm} sx={{ cursor: "pointer" }} />
          {openConfirm && (
            <Confirmation
              openConfirm={openConfirm}
              handleCloseConfirm={handleCloseConfirm}
              deleteHandler={deleteHandler}
            />
          )}
          <EditIcon
            onClick={handleOpen}
            sx={{ marginLeft: 20, cursor: "pointer" }}
          />
          {open && (
            <MovieForm
              open={open}
              close={handleClose}
              actionType="edit"
              id={movie.id}
            />
          )}
        </CardActions>
      )}
    </Card>
  );
};

export default MovieCard;


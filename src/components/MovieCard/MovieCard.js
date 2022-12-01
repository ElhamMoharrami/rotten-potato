import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSelectedItem,
  fetchDetailList,
  fetchCrewTable,
} from "../../store/api-call";
import { movieActions } from "../../store/data-slice";
import { crewTableActions } from "../../store/crewtable-Slice";
import MovieForm from "../MovieForm/MovieForm";
import { Link } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Confirmation from "../Confirmation/Confirmation";

const MovieCard = (props) => {
  const { artistDetail } = props;
  const { movie } = props;
  const dispatch = useDispatch();
  const currentPage = useSelector(
    (state) => state.movies.data.page.currentPage
  );
  const itemsPerPage = useSelector((state) => state.style.itemsPerPage);
  const content = useSelector((state) => state.movies.data.content);
  const account = useSelector((state) => state.login.account);
  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleOpen = () => {
    dispatch(fetchCrewTable(crewTableActions));
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleOpenConfirm = () => setOpenConfirm(true);
  const handleCloseConfirm = () => setOpenConfirm(false);

  const deleteHandler = () => {
    const setCurrentPage = content.length < 1 ? currentPage - 1 : currentPage;
    dispatch(
      deleteSelectedItem(
        movie.id,
        movie.title,
        "movies",
        itemsPerPage,
        setCurrentPage,
        movieActions
      )
    );
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
      <Link href={`/movies/${movie.id}`} sx={{ textDecoration: "none" }}>
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
          >
            {movie.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {movie.year}
          </Typography>
        </CardContent>
      </Link>
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

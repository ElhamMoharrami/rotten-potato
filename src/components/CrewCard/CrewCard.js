import * as React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { artistActions } from "../../store/data-slice";
import { deleteSelectedItem } from "../../store/api-call";
import blankProfilePicture from "../../assets/images/blankProfilePicture.png";

const CrewCard = (props) => {
  const { artist } = props;
  const dispatch = useDispatch();
  const itemsPerPage = useSelector(
    (state) => state.crews.data.page.itemsPerPage
  );
  const currentPage = useSelector((state) => state.crews.data.page.currentPage);
  const content = useSelector((state) => state.crews.data.content);

  const deleteHandler = () => {
    dispatch(
      deleteSelectedItem(
        artist.id,
        "crews",
        itemsPerPage,
        currentPage,
        artistActions,
        content.length
      )
    );
  };

  return (
    <Card sx={{ height: 450, borderRadius: "30px", position: "relative" }}>
      <Link to={`/Artists/${artist.id}`}>
        <CardMedia
          component="img"
          alt={artist.name}
          height="320"
          image={artist.poster !== null ? artist.poster : blankProfilePicture}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {artist.name}
          </Typography>
        </CardContent>
      </Link>
      <CardActions sx={{ position: "absolute", bottom: 0 }}>
        <DeleteIcon onClick={deleteHandler} />
        <Link to={`/crews/edit/${artist.id}`}>
          <EditIcon sx={{ color: "black", marginLeft: 20 }} />
        </Link>
      </CardActions>
    </Card>
  );
};

export default CrewCard;

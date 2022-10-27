import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CrewForm from "../CrewForm/CrewForm";
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
import { Link } from "@mui/material";
import Confirmation from "../Confirmation/Confirmation";

const CrewCard = (props) => {
  const { crew, movieDetail } = props;
  const dispatch = useDispatch();
  const itemsPerPage = useSelector(
    (state) => state.crews.data.page.itemsPerPage
  );
  const currentPage = useSelector((state) => state.crews.data.page.currentPage);
  const content = useSelector((state) => state.crews.data.content);
  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenConfirm = () => setOpenConfirm(true);
  const handleCloseConfirm = () => setOpenConfirm(false);

  const deleteHandler = () => {
    dispatch(
      deleteSelectedItem(
        crew.id,
        crew.name,
        "crews",
        itemsPerPage,
        currentPage,
        artistActions,
        content.length
      )
    );
  };

  return (
    <Card
      sx={{
        height: 450,
        borderRadius: "30px",
        position: "relative",
        width: "240px",
      }}
    >
      <Link href={`/crews/${crew.id}`} sx={{ textDecoration: "none" }}>
        <CardMedia
          component="img"
          alt={crew.name}
          height="320"
          image={crew.poster !== null ? crew.poster : blankProfilePicture}
        />
        <CardContent>
          <Typography sx={{ fontSize: 18, color: "black" }} variant="h5">
            {crew.name}
          </Typography>
        </CardContent>
      </Link>
      {!movieDetail && (
        <CardActions
          sx={{
            position: "absolute",
            bottom: 0,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "160px",
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
            sx={{ color: "black", marginLeft: 20 }}
          />
          {open && (
            <CrewForm
              open={open}
              close={handleClose}
              actionType="edit"
              id={crew.id}
            />
          )}
        </CardActions>
      )}
    </Card>
  );
};

export default CrewCard;

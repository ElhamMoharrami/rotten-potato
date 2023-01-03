import { useState } from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import add from "../../assets/images/add.png";

const ShowList = (props) => {
  const account = useSelector((state) => state.login.account);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Grid container spacing={2}>
        {props.data.map((item, index) => (
          <Box key={index}>
            <Grid item>{props.card(item)}</Grid>
          </Box>
        ))}
        {account.role === "ADMIN" && (
          <Grid item>
            <Card
              onClick={handleOpen}
              sx={{
                height: 510,
                borderRadius: "20px",
                position: "relative",
                width: "240px",
              }}
             data-testid= "addMovie" 
            >
              <CardMedia
                component="img"
                alt="add sign"
                height="340"
                image={add}
              />
              <CardContent>
                <Typography
                  sx={{ fontSize: 18, cursor: "pointer" }}
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  Add new Item 
                </Typography>
              </CardContent>
            </Card>
            {props.form(handleClose, open, "add")}
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default ShowList;

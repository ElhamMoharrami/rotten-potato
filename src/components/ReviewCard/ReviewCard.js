import React from "react";
import Rating from "@mui/material/Rating";
import ShowMoreText from "react-show-more-text";
import { Card, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";



const ReviewCard = (props) => {
  const { data } = props;

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <Card sx={{ boxShadow: 10, margin: "20px", padding: "10px" }}>
      <Grid
        container
        spacing={3}
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid xs={9} item>
          <ShowMoreText
            lines={2}
            more="Show more"
            less="Show less"
            className="content-css"
            anchorClass="show-more-less-clickable"
            expanded={false}
            truncatedEndingComponent={"... "}
          >
            <Typography>{data.description}</Typography>
          </ShowMoreText>
        </Grid>
        <Grid xs={3} item>
          <Item>
            <Rating readOnly value={data.rate} />
          </Item>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ReviewCard;


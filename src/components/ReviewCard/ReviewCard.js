import React from "react";
import { Card, Typography } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import ShowMoreText from "react-show-more-text";

const ReviewCard = (props) => {
  const { data } = props;
  return (
    <Card variant="outlined">
      <CardContent>
        <ShowMoreText
          lines={3}
          more="Show more"
          less="Show less"
          className="content-css"
          anchorClass="show-more-less-clickable"
          expanded={false}
          truncatedEndingComponent={"... "}
        >
          <Typography>{data.description}</Typography>
        </ShowMoreText>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;

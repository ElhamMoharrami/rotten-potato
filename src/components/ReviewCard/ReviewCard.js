import Rating from "@mui/material/Rating";
import ShowMoreText from "react-show-more-text";
import { Card, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Item } from "../../assets/config";

const ReviewCard = (props) => {
  const { data } = props;

  

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

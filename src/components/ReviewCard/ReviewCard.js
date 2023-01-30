import React from "react";
import InputAdornment from "@mui/material/InputAdornment";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";

const ReviewCard = (props) => {
  const { data } = props;

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <OutlinedInput
        fullWidth
        inputProps={{ "data-testid": "review-comment" }}
        id="user-review"
        placeholder="Write Your Own Review"
        value={data.description}
        endAdornment={
          <InputAdornment position="end">
            <Rating readOnly value={data.rate} />
          </InputAdornment>
        }
      />
    </Box>
  );
};

export default ReviewCard;

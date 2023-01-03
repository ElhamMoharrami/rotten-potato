import React from "react";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import { Card, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { InputLabel, Input, FormHelperText } from "@mui/material";
import Rating from "@mui/material/Rating";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import { commitComment } from "../../store/api-call";

const UserReview = (props) => {
  const dispatch = useDispatch();
  const { movieId, userId } = props;
  const [value, setValue] = React.useState(0);
  const [comment, setComment] = React.useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    const data = {
      movie: `http://localhost:8080/api/movies/${movieId}`,
      user: `http://localhost:8080/api/users/${userId}`,
      rate: value,
      description: comment,
    };
    dispatch(commitComment(data));
    console.log(data);
  };

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <form onSubmit={submitHandler}>
        <FormControl fullWidth variant="standard">
          <OutlinedInput
            id="user-review"
            placeholder="Write Your Own Review"
            value={comment}
            endAdornment={
              <InputAdornment position="end">
                <Typography component="legend">Your Rate</Typography>
                <Rating
                  name="simple-controlled"
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2, marginLeft: "20px", marginTop: "16px" }}
                >
                  submit review
                </Button>
              </InputAdornment>
            }
            onChange={(event) => setComment(event.target.value)}
          />
        </FormControl>
      </form>
    </Box>
  );
};

export default UserReview;

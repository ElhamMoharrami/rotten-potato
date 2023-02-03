import { useState } from "react";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import { Typography } from "@mui/material";
import Rating from "@mui/material/Rating";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import { commitComment } from "../../store/api-call";
import { reviewsActions } from "../../store/reviews-slice";
import { FormHelperText } from "@mui/material";

const UserReview = (props) => {
  const dispatch = useDispatch();
  const { movieId, userId } = props;
  const [value, setValue] = useState(0);
  const [comment, setComment] = useState("");
  const [commentIsValid, setCommentIsValid] = useState(true);

  const onchangeHandler = (event) => {
    const value = event.target.value;
    console.log(value.length);
    if (value.length >= 100) {
      setCommentIsValid(false);
    } else {
      setCommentIsValid(true);
    }
    setComment(value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const data = {
      movie: `http://localhost:8080/api/movies/${movieId}`,
      user: `http://localhost:8080/api/users/${userId}`,
      rate: value,
      description: comment,
    };
    dispatch(commitComment(data, movieId));
    dispatch(reviewsActions.setOpenAlert({ openAlert: true }));
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
            inputProps={{ "data-testid": "review-comment" }}
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
            onChange={onchangeHandler}
          />
          {!commentIsValid && (
            <FormHelperText>
              should not be longer than 100 characters.
            </FormHelperText>
          )}
        </FormControl>
      </form>
    </Box>
  );
};

export default UserReview;

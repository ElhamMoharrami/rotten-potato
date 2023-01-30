import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reviews: [],
  actionState: { status: "", action: "", title: "" },
  openAlert: false,
};

const createReviewsSlice = () => {
  return createSlice({
    name: "reviews",
    initialState,
    reducers: {
      setData(state, action) {
        state.reviews = action.payload.reviews;
      },
      setActionState(state, action) {
        state.actionState = action.payload.actionState;
      },
      setOpenAlert(state,action) {
        state.openAlert = action.payload.openAlert;
      },
    },
  });
};

export const reviewsSlice = createReviewsSlice("reviews");

export const reviewsActions = reviewsSlice.actions;

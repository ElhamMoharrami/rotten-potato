import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: { content: [], pageCount: 0 },
  selectedItem: [],
  detailList: [],
  isLoading: false,
};

const createDataSlice = (name) => {
  return createSlice({
    name: name,
    initialState,
    reducers: {
      setData(state, action) {
        state.data.content = action.payload.fetchedData;
        state.data.pageCount = action.payload.pageCount;
      },
      setDetail(state, action) {
        state.selectedItem = action.payload.selectedItem;
      },
      setDetailList(state, action) {
        state.detailList = action.payload.detailList;
      },
      setIsLoading(state, action) {
        state.isLoading = action.payload.isLoading;
      },
    },
  });
};

export const movieSlice = createDataSlice("movies");
export const artistsSlice = createDataSlice("artists");

export const movieActions = movieSlice.actions;
export const artistActions = artistsSlice.actions;

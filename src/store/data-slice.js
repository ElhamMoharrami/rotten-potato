import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    content: [],
    page: { pageCount: 0, currentPage: 1},
  },
  selectedItem: [],
  detailList: [],
  isLoading: false,
  isSearching: false,
  openAlert: false,
  actionState: { status: "", action: "", title: "" },
};

const createDataSlice = (name) => {
  return createSlice({
    name: name,
    initialState,
    reducers: {
      setData(state, action) {
        state.data.content = action.payload.fetchedData;
        state.data.page.pageCount = action.payload.pageCount;
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
      setCurrentPage(state, action) {
        state.data.page.currentPage = action.payload.currentPage;
      },

      setIsSearching(state, action) {
        state.isSearching = action.payload.isSearching;
      },
      clearData(state) {
        state = initialState;
      },
      setActionState(state, action) {
        state.actionState = action.payload.actionState;
      },
      setOpenAlert(state, action) {
        state.openAlert = action.payload.openAlert;
      },
    },
  });
};

export const movieSlice = createDataSlice("movies");
export const artistsSlice = createDataSlice("artists");

export const movieActions = movieSlice.actions;
export const artistActions = artistsSlice.actions;

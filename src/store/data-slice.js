import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: { content: [], pageCount: 0, currentPage: 1, itemsPerPage: 5 },
  selectedItem: [],
  detailList: [],
  isLoading: false,
  isSearching: "",
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
      setCurrentPage(state, action) {
        state.data.currentPage = action.payload.currentPage;
      },
      setItemsPerPage(state, action) {
        state.data.itemsPerPage = action.payload.itemsPerPage;
      },
      setIsSearching(state, action) {
        state.isSearching = action.payload.isSearching;
      },
      clearData(state) {
        state.data = {
          content: [],
          pageCount: 0,
          currentPage: 1,
          itemsPerPage: 5,
        };
        state.selectedItem = [];
        state.detailList = [];
        state.isLoading = false;
        state.isSearching = "";
        localStorage.clear();
      },
    },
  });
};

export const movieSlice = createDataSlice("movies");
export const artistsSlice = createDataSlice("artists");

export const movieActions = movieSlice.actions;
export const artistActions = artistsSlice.actions;

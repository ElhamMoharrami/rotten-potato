import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  page: { pageCount: 0, currentPage: 1, itemsPerPage: 10 },
  isLoading: false,
};

const createDataSlice = (name) => {
  return createSlice({
    name: name,
    initialState,
    reducers: {
      setData(state, action) {
        state.data = action.payload.fetchedData;
        state.page.pageCount = action.payload.pageCount;
      },
      setIsLoading(state, action) {
        state.isLoading = action.payload.isLoading;
      },
      setCurrentPage(state, action) {
        state.page.currentPage = action.payload.currentPage;
      },
    },
  });
};

export const movieCrewTableSlice = createDataSlice("movieCrwTable");
export const crewMovieTableSlice = createDataSlice("crewMovieTable");

export const movieCrewTableActions = movieCrewTableSlice.actions;
export const crewMovieTableActions = crewMovieTableSlice.actions;


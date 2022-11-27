import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  crew: [],
  page: { pageCount: 0, currentPage: 1,itemsPerPage:10 },
  isLoading:false
};

const createCrewTableSlice = () => {
  return createSlice({
    name: "crewTable",
    initialState,
    reducers: {
      setData(state, action) {
        state.crew = action.payload.fetchedData;
        state.page.pageCount = action.payload.pageCount;
      },
      setIsLoading(state, action) {
        state.isLoading = action.payload.isLoading;
      },
    },
  });
};

export const crewTableSlice = createCrewTableSlice("crewTable");
export const crewTableActions = crewTableSlice.actions;

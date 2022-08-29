import { createSlice } from "@reduxjs/toolkit";
import { RiseLoader } from "react-spinners";

const initialState = {
  data: [],
  selectedItem: [],
  crew: [],
  movies: [],
  isLoading: true,
  pageCount: 0,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setData(state, action) {
      state.data = action.payload.fetchedData;
      state.pageCount = action.payload.pageCount;
    },
    clearData(state, action) {
      Object.assign(state, initialState);
    },
    setDetail(state, action) {
      state.selectedItem = action.payload.selectedItem;
    },
    clearDetail(state) {
      state.selectedItem = [];
      state.crew = [];
      state.movies = [];
    },
    setCrew(state, action) {
      state.crew = action.payload.crew;
    },
    setMovies(state, action) {
      state.movies = action.payload.movies;
    },
    showSpinner(state, action) {
      state.isLoading = action.payload.isLoading;
    },
  },
});

const getDataRequest = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const fetchData = (url) => {
  return async (dispatch) => {
    try {
      dispatch(dataActions.showSpinner({ isLoading: true }));
      const getData = await getDataRequest(url);

      dispatch(
        dataActions.setData({
          fetchedData: getData.content,
          pageCount: getData.page.totalPages,
        })
      );
      dispatch(dataActions.showSpinner({ isLoading: false }));
      window.scrollTo(0, 0);
    } catch(err) {
      console.log(err);
    }
  };
};

export const fetchDetail = (url) => {
  return async (dispatch) => {
    try {
      const getDetail = await getDataRequest(url);
      dispatch(
        dataActions.setDetail({
          selectedItem: getDetail,
        })
      );
    } catch {
      console.log("fuuuuuuuuuuuckkkkkkk");
    }
  };
};

export const fetchCrews = (url) => {
  return async (dispatch) => {
    try {
      const getCrew = await getDataRequest(url);
      dispatch(dataActions.setCrew({ crew: getCrew.content }));
    } catch {
      console.log("weeeeeeeeeeeeeeeeeeeep");
    }
  };
};

export const fetchMovies = (url) => {
  return async (dispatch) => {
    try {
      const getMovies = await getDataRequest(url);
      dispatch(dataActions.setMovies({ movies: getMovies.content }));
    } catch {
      console.log("brrrrrrrrrrr");
    }
  };
};

export const dataActions = dataSlice.actions;

export default dataSlice;

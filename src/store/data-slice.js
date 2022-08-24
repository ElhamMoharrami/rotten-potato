import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  selectedItem: [],
  crew: [],
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
      state.data = [];
      state.pageCount = 0;
      state.selectedItem = [];
    },
    setDetail(state, action) {
      state.selectedItem = action.payload.selectedItem;
    },
    clearDetail(state) {
      state.selectedItem = [];
      state.crew = [];
    },
    setCrew(state, action) {
      state.crew = action.payload.crew;
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
      const getData = await getDataRequest(url);

      dispatch(
        dataActions.setData({
          fetchedData: getData.content,
          pageCount: getData.page.totalPages,
        })
      );
      window.scrollTo(0, 0);
    } catch {
      console.log("tadaaaaaaaaaaaaaaa");
    }
  };
};

//this url has an id
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

export const dataActions = dataSlice.actions;

export default dataSlice;

import { artistActions, movieActions } from "./data-slice";

const BASEURL = `http://localhost:8080/api`;

const getDataRequest = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const fetchData = (type, size, currentPage, action) => {
  return async (dispatch) => {
    try {
      dispatch(action.setIsLoading({ isLoading: true }));
      const url = `${BASEURL}/${type}?page=${currentPage - 1}&size=${size}`;
      const getData = await getDataRequest(url);
      dispatch(
        action.setData({
          fetchedData: getData.content,
          pageCount: getData.page.totalPages,
        })
      );
      dispatch(action.setIsLoading({ isLoading: false }));
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchDetail = (id, type, action) => {
  return async (dispatch) => {
    try {
      const url = `${BASEURL}/${type}/${id}`;
      const getDetail = await getDataRequest(url);
      dispatch(
        action.setDetail({
          selectedItem: getDetail,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchDetailList = (id, type, detail, action) => {
  return async (dispatch) => {
    try {
      const url = `${BASEURL}/${type}/${id}/${detail}`;
      const getDetailList = await getDataRequest(url);
      dispatch(action.setDetailList({ detailList: getDetailList.content }));
    } catch (err) {
      console.log(err);
    }
  };
};

export const saveData = (dataObj,type,itemsPerPage,currentPage,action) => {
  return async (dispatch) => {
    try {
      const url = `${BASEURL}/${type}`;
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataObj),
      });
      dispatch(fetchData(type, itemsPerPage, currentPage, action));
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteSelectedItem = (
  id,
  type,
  itemsPerPage,
  currentPage,
  action,
  contentLength
) => {
  return async (dispatch) => {
    try {
      const url = `${BASEURL}/${type}/${id}`;
      await fetch(url, {
        method: "DELETE",
      });
      if (contentLength <= 1) {
        dispatch(fetchData(type, itemsPerPage, currentPage - 1, action));
      } else {
        dispatch(fetchData(type, itemsPerPage, currentPage, action));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateData = (type, id, dataObj,itemsPerPage,currentPage,action) => {
  return async (dispatch) => {
    try {
      const url = `${BASEURL}/${type}/${id}`;
      await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataObj),
      });
      dispatch(fetchData(type, itemsPerPage, currentPage, action));
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchSearchedTitle = (title, currentPage, itemsPerPage) => {
  return async (dispatch) => {
    try {
      const url = `${BASEURL}/movies/search/byTitle?title=${title}&page=${
        currentPage - 1
      }&size=${itemsPerPage}`;
      const getData = await getDataRequest(url);
      dispatch(
        movieActions.setData({
          fetchedData: getData.content,
          pageCount: getData.page.totalPages,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchSearchedName = (title, currentPage, itemsPerPage) => {
  return async (dispatch) => {
    try {
      const url = `${BASEURL}/crews/search/byName?name=${title}&page=${
        currentPage - 1
      }&size=${itemsPerPage}`;
      const getData = await getDataRequest(url);
      dispatch(
        artistActions.setData({
          fetchedData: getData.content,
          pageCount: getData.page.totalPages,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchSearchedYear = (
  startYear,
  endYear,
  currentPage,
  itemsPerPage
) => {
  return async (dispatch) => {
    try {
      const url = `${BASEURL}/movies/search/byYear?from=${startYear}&to=${endYear}&page=${currentPage}&size=${itemsPerPage}&sort=year,desc`;
      const getData = await getDataRequest(url);
      dispatch(
        movieActions.setData({
          fetchedData: getData.content,
          pageCount: getData.page.totalPages,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchSearchedProfession = (
  profession,
  currentPage,
  itemsPerPage
) => {
  return async (dispatch) => {
    try {
      const url = `${BASEURL}/crews/search/byProfession?profession=${profession}&page=${currentPage-1}&size=${itemsPerPage}&sort=profession`;
      const getData = await getDataRequest(url);
      dispatch(
        artistActions.setData({
          fetchedData: getData.content,
          pageCount: getData.page.totalPages,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };
};

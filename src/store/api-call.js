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

export const saveData = (dataObj, type, itemsPerPage, currentPage, action) => {
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

export const updateData = (
  type,
  id,
  dataObj,
  itemsPerPage,
  currentPage,
  action
) => {
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



export const fetchSearch = (data, type, action, itemsPerPage, currentPage) => {
  return async (dispatch) => {
    try {
      let url = new URL(`${BASEURL}/${type}/search/search`);
      for (let item in data) {
        if (item !== "sortType") {
          url.searchParams.set(item, data[item]);
        }
      }
      url.searchParams.set("size", itemsPerPage);
      url.searchParams.set("page", currentPage);
      if (data.sortType) {
        url.href = url.href + `,${data.sortType}`;
      }
      const getData = await getDataRequest(url.href);
      dispatch(
        action.setData({
          fetchedData: getData.content,
          pageCount: getData.page.totalPages,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };
};

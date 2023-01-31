import { loginActions } from "./login-slice";
import { BASEURL } from "../assets/config";
import { reviewsActions } from "./reviews-slice";

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

export const saveData = (
  dataObj,
  title,
  type,
  itemsPerPage,
  currentPage,
  action
) => {
  return async (dispatch) => {
    try {
      const url = `${BASEURL}/${type}`;
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataObj),
      });
      dispatch(fetchData(type, itemsPerPage, currentPage, action));
      dispatch(
        action.setActionState({
          actionState: { status: "success", action: "add", title: title },
        })
      );
    } catch (err) {
      dispatch(
        action.setActionState({
          actionState: { status: "error", action: "add", title: title },
        })
      );
    }
  };
};

export const deleteSelectedItem = (
  id,
  title,
  type,
  itemsPerPage,
  currentPage,
  action
) => {
  return async (dispatch) => {
    try {
      const url = `${BASEURL}/${type}/${id}`;
      await fetch(url, {
        method: "DELETE",
      });

      dispatch(fetchData(type, itemsPerPage, currentPage, action));

      dispatch(
        action.setActionState({
          actionState: {
            status: "success",
            action: "delete",
            title: title,
          },
        })
      );
    } catch (err) {
      dispatch(
        action.setActionState({
          actionState: {
            status: "error",
            action: "delete",
            title: title,
          },
        })
      );
    }
  };
};

export const updateData = (
  type,
  title,
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
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataObj),
      });
      dispatch(fetchData(type, itemsPerPage, currentPage, action));
      dispatch(
        action.setActionState({
          actionState: {
            status: "success",
            action: "edit",
            title: title,
          },
        })
      );
    } catch (err) {
      dispatch(
        action.setActionState({
          actionState: {
            status: "error",
            action: "edit",
            title: title,
          },
        })
      );
    }
  };
};

export const fetchSearch = (data, type, action, itemsPerPage, currentPage) => {
  return async (dispatch) => {
    try {
      let url = new URL(`${BASEURL}/${type}/search/search`);
      for (let item in data) {
        if (item !== "sortType" && item !== "sort") {
          url.searchParams.set(item, data[item]);
        }
      }
      url.searchParams.set("size", itemsPerPage);
      url.searchParams.set("page", currentPage - 1);
      if (data.sort) {
        url.searchParams.set("sort", data.sort);
      }
      if (data.sort && data.sortType) {
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

export const createAccount = (dataObj) => {
  return async (dispatch) => {
    try {
      const url = `${BASEURL}/users`;
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataObj),
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const usernameCheck = (username) => {
  return async (dispatch) => {
    try {
      const url = `${BASEURL}/users/search/byUsername?username=${username}`;
      const response = await fetch(url);

      dispatch(
        loginActions.setUsernameExists({
          usernameExists: response.ok ? true : false,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };
};

export const login = (dataObj) => {
  return async (dispatch) => {
    try {
      const url = `${BASEURL}/login?username=${dataObj.username}&password=${dataObj.password}`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      dispatch(
        loginActions.setData({
          role: data.role,
          username: data.username,
          password: data.password,
          fullname: data.fullname,
          id: data.id,
          isLoggedIn: true,
        })
      );
      dispatch(
        loginActions.setActionState({
          actionState: {
            status: "success",
            action: "login",
            title: "account",
          },
        })
      );
    } catch (err) {
      dispatch(
        loginActions.setActionState({
          actionState: {
            status: "error",
            action: "login",
            title: "account",
          },
        })
      );
    }
  };
};

export const updateAccount = (dataObj, action) => {
  return async (dispatch) => {
    try {
      const url = `${BASEURL}/users/${dataObj.id}`;
      await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataObj),
      });
      dispatch(
        action.setActionState({
          actionState: {
            status: "success",
            action: "update",
            title: "account",
          },
        })
      );
      dispatch(
        loginActions.setData({
          role: dataObj.role,
          username: dataObj.username,
          password: dataObj.password,
          fullname: dataObj.fullname,
          id: dataObj.id,
          isLoggedIn: true,
        })
      );
    } catch (err) {
      dispatch(
        action.setActionState({
          actionState: {
            status: "error",
            action: "update",
            title: "account",
          },
        })
      );
    }
  };
};

export const deleteAccount = (id) => {
  return async (dispatch) => {
    try {
      const url = `${BASEURL}/users/${id}`;
      await fetch(url, {
        method: "DELETE",
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchCrewTable = (action, itemsPerPage, currentPage) => {
  return async (dispatch) => {
    try {
      const url = `${BASEURL}/crews/size=${itemsPerPage}&page=${
        currentPage - 1
      }`;
      const getData = await getDataRequest(url);
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

export const commitComment = (data, movieId) => {
  return async (dispatch) => {
    try {
      let url = new URL(`${BASEURL}/reviews`);
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      dispatch(fetchReviews(movieId));
      dispatch(
        reviewsActions.setActionState({
          actionState: {
            status: "success",
            action: "submit",
            title: "comment",
          },
        })
      );
    } catch (err) {
      dispatch(
        reviewsActions.setActionState({
          actionState: {
            status: "error",
            action: "submit",
            title: "comment",
          },
        })
      );
    }
  };
};

export const fetchReviews = (movieId) => {
  return async (dispatch) => {
    try {
      const url = `${BASEURL}/reviews/search/search?movie=${movieId}`;
      const getData = await getDataRequest(url);

      dispatch(
        reviewsActions.setData({
          reviews: getData.content,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchTableData = (type, size, currentPage, action) => {
  return async (dispatch) => {
    try {
      dispatch(action.setIsLoading({ isLoading: true }));
      const url = `${BASEURL}/${type}?page=${currentPage - 1}&size=${size}`;
      const getData = await getDataRequest(url);
      dispatch(
        action.setData({
          fetchedData: getData.content,
          pageCount: getData.page.totalPages,
          totalElements: getData.page.totalElements,
        })
      );
      dispatch(action.setIsLoading({ isLoading: false }));
    } catch (err) {
      console.log(err);
    }
  };
};

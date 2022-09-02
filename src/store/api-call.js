import { BASEURL } from "../assets/apis/config";

const getDataRequest = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const fetchData = (type, size, currentPage, action) => {
  return async (dispatch) => {
    try {
      dispatch(action.setIsLoading({isLoading:true}))
      const url = `${BASEURL}/${type}?page=${currentPage - 1}&size=${size}`;
      const getData = await getDataRequest(url);

      dispatch(
        action.setData({
          fetchedData: getData.content,
          pageCount: getData.page.totalPages,
        })
      );
      dispatch(action.setIsLoading({isLoading:false}))
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

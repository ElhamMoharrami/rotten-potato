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

export const sendMovieDataToBackend = (url,dataObj) => {
  return async (dispatch) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title:dataObj.movieName,
          imdbRating:dataObj.imbdRating,
          imdbVotes:dataObj.imbdVotes,
          runtime:dataObj.runtime,
          year:dataObj.year,
          plot:dataObj.description,
          director:dataObj.director,
          actors:dataObj.stars,
          genre:dataObj.generes,
          language:dataObj.languages,
          awards:dataObj.awards,
          poster:dataObj.poster,
          
        }),
      });
    const data=response.json()
    console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteSelectedMovie = (id) => {
  return async (dispatch) => {
    try {
      const url = `${BASEURL}/movies/${id}`;
      await fetch(url, {
        method: "DELETE"
      });
    } catch (err) {
      console.log(err);
    }
  };
};

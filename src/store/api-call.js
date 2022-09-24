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

export const saveMovie = (dataObj) => {
  return async (dispatch) => {
    try {
      const url = `${BASEURL}/movies`;
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: dataObj.title,
          imdbRating: dataObj.imdbRating,
          imdbVotes: dataObj.imdbVotes,
          runtime: dataObj.runtime,
          year: dataObj.year,
          plot: dataObj.plot,
          director: dataObj.director,
          actors: dataObj.actors,
          genre: dataObj.genre,
          language: dataObj.language,
          awards: dataObj.awards,
          poster: dataObj.poster,
        }),
      });
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

export const updateMovie = (id, dataObj) => {
  return async (dispatch) => {
    try {
      const url = `${BASEURL}/movies/${id}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: dataObj.id,
          title: dataObj.title,
          imdbRating: dataObj.imdbRating,
          imdbVotes: dataObj.imdbVotes,
          runtime: dataObj.runtime,
          year: dataObj.year,
          plot: dataObj.plot,
          director: dataObj.director,
          actors: dataObj.actors,
          genre: dataObj.genre,
          language: dataObj.language,
          awards: dataObj.awards,
          poster: dataObj.poster,
        }),
      });
      const data = response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
};

export const saveCrew = (dataObj) => {
  return async (dispatch) => {
    try {
      const url = `${BASEURL}/crews`;
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: dataObj.name,
          birth: dataObj.birth,
          death: dataObj.death,
          profession: dataObj.profession,
          poster: dataObj.poster,
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateCrew = (id, dataObj) => {
  return async (dispatch) => {
    try {
      const url = `${BASEURL}/movies/${id}`;
      await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: dataObj.id,
          name: dataObj.name,
          birth: dataObj.birth,
          death: dataObj.death,
          profession: dataObj.profession,
          poster: dataObj.poster,
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchSearchedTitle = (
  type,
  title,
  currentPage,
  itemsPerPage,
  action,
  sort
) => {
  return async (dispatch) => {
    try {
      const moviesUrl = `http://localhost:8080/api/${type}/search/byTitle?title=${title}&page=${
        currentPage - 1
      }&size=${itemsPerPage}&sort=${sort}`;
      const crewsUrl = `http://localhost:8080/api/${type}/search/byName?name=${title}&page=${
        currentPage - 1
      }&size=${itemsPerPage}&sort=${sort}`;
      const url = type === "movies" ? moviesUrl : crewsUrl;
      console.log(url);
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

export const fetchSearchedYear = (
  startYear,
  endYear,
  currentPage,
  itemsPerPage
) => {
  return async (dispatch) => {
    try {
      const url = `http://localhost:8080/api/movies/search/byYear?from=${startYear}&to=${endYear}&page=${currentPage}&size=${itemsPerPage}&sort=year,desc`;
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
      const url = `http://localhost:8080/api/crews/search/byProfession?profession=${profession}&page=${currentPage}&size=${itemsPerPage}&sort=profession`;
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

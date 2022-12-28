import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { fetchData, fetchSearch } from "../../store/api-call";
import Box from "@mui/material/Box";
import ShowList from "../ShowList/ShowList";
import Pagination from "@mui/material/Pagination";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import { style } from "../../assets/config";
import { movieActions } from "../../store/data-slice";

const ListData = (props) => {
  const {
    type,
    isLoading,
    data,
    action,
    card,
    isSearching,
    form,
    itemsPerPage,
    currentPage,
  } = props;
  const dispatch = useDispatch();
  const pageRangeDisplayed = 3;
  const initialData = localStorage.getItem("data");
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (!isSearching) {
      dispatch(fetchData(type, itemsPerPage, currentPage, action));
      // window.scrollTo(0, 0);
    } else if (isSearching && isFirstRun.current) {
      isFirstRun.current = false;
      return;
    } else if (isSearching && !isFirstRun.current) {
      dispatch(
        fetchSearch(
          JSON.parse(initialData),
          type,
          action,
          itemsPerPage,
          currentPage
        )
      );
    }
  }, [
    itemsPerPage,
    dispatch,
    currentPage,
    action,
    type,
    isSearching,
    initialData,
  ]);


  //there is a bug here for no result
  const List = () => {
    // if (data.content.length >= 1) {
    return (
      <Box>
        <ShowList form={form} type={type} data={data.content} card={card} />
      </Box>
    );
    // } else if (data.content.length < 1 && isSearching) {
    //   return (
    //     <Box sx={style}>
    //       <Typography
    //         sx={{
    //           fontSize: 14,
    //           textAlign: " center",
    //           verticalAlign: "middle",
    //           lineHeight: "90px",
    //         }}
    //         color="text.secondary"
    //         gutterBottom
    //       >
    //         The Search Term Did Not Bring Any Results.
    //       </Typography>
    //     </Box>
    //   );
    // }
  };

  const handlePageClick = async (event, page) => {
    dispatch(action.setCurrentPage({ currentPage: page }));
  };

  return (
    <Box>
      {isLoading && <LinearProgress />}
      {!isLoading && <List />}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 15,
          marginBottom: 10,
          marginTop: 10,
        }}
      >
        <Pagination
          boundaryCount={pageRangeDisplayed}
          count={data.page.pageCount}
          onChange={handlePageClick}
          page={currentPage}
          size="medium"
        />
      </Box>
    </Box>
  );
};

export default ListData;

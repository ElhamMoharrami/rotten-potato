import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchData, fetchSearch } from "../../store/api-call";
import Box from "@mui/material/Box";
import ShowList from "../ShowList/ShowList";
import Pagination from "@mui/material/Pagination";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import { style } from "../../assets/config";
import { Grid } from "@mui/material";
import { FormControl, InputLabel } from "@mui/material";
import { options } from "../../assets/config";
import { loginActions } from "../../store/login-slice";
import MenuItem from "@mui/material/MenuItem";

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
    pageCount,
  } = props;
  const dispatch = useDispatch();
  const pageRangeDisplayed = 3;
  const initialData = localStorage.getItem(`${type}`);
  const isFirstRun = useRef(true);
  const [listDataItemsPerPage, setListDataItemsPerPage] = useState("");

  useEffect(() => {
    if (!isSearching) {
      dispatch(fetchData(type, itemsPerPage, currentPage, action));
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

  const itemsPerPageHandler = (event) => {
    setListDataItemsPerPage(event.target.value);
    dispatch(
      loginActions.setItemsPerPage({ itemsPerPage: event.target.value })
    );
  };

  const List = () => {
    if (pageCount === 0 && isSearching) {
      return (
        <Box sx={style}>
          <Typography
            sx={{
              fontSize: 14,
              textAlign: " center",
              verticalAlign: "middle",
              lineHeight: "90px",
            }}
            color="text.secondary"
            gutterBottom
          >
            The Search Term Did Not Bring Any Results.
          </Typography>
        </Box>
      );
    }
    return (
      <Box>
        <ShowList
          pageCount={pageCount}
          form={form}
          type={type}
          data={data.content}
          card={card}
        />
      </Box>
    );
  };

  const handlePageClick = async (event, page) => {
    dispatch(action.setCurrentPage({ currentPage: page }));
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box>
        {isLoading && <LinearProgress />}
        {!isLoading && <List />}
      </Box>
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
        {pageCount !== 0 && (
          <Grid sx={{ alignItems: "center" }} container>
            <Grid item xs={6}>
              <FormControl sx={{ width: "50%" }}>
                <InputLabel id="size-select">size</InputLabel>
                <Select
                  value={listDataItemsPerPage}
                  labelId="select-label"
                  variant="standard"
                  label="size"
                  onChange={itemsPerPageHandler}
                >
                  {options.map((option, index) => (
                    <MenuItem value={option.value} key={index}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <Pagination
                boundaryCount={pageRangeDisplayed}
                count={data.page.pageCount}
                onChange={handlePageClick}
                page={currentPage}
                size="medium"
              />
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default ListData;

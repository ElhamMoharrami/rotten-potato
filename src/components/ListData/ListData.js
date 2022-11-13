import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchData } from "../../store/api-call";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ShowList from "../ShowList/ShowList";
import Pagination from "@mui/material/Pagination";
import LinearProgress from "@mui/material/LinearProgress";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { style } from "../../assets/config";

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
  const options = [
    { value: 10, label: "10" },
    { value: 15, label: "15" },
    { value: 20, label: "20" },
    { value: 30, label: "30" },
  ];

  useEffect(() => {
    if (isSearching === "") {
      dispatch(fetchData(type, itemsPerPage, currentPage, action));
      window.scrollTo(0, 0);
    }
  }, [itemsPerPage, dispatch, currentPage, action, type, isSearching]);

  const List = () => {
    if (data.content.length >= 1) {
      return (
        <Box>
          <ShowList form={form} type={type} data={data.content} card={card} />
        </Box>
      );
    } else if (data.content.length < 1 && isSearching) {
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
  };

  const handlePageClick = async (event, page) => {
    dispatch(action.setCurrentPage({ currentPage: page }));
  };

  const itemsPerPageHandler = (event) => {
    dispatch(action.setItemsPerPage({ itemsPerPage: event.target.value }));
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
        {!isLoading && data.content.length > 1 && (
          <FormControl>
            <InputLabel id="select-label">Size</InputLabel>
            <Select
              sx={{
                paddingRight: 2,
                paddingLeft: 2,
              }}
              value={itemsPerPage}
              labelId="select-label"
              onChange={itemsPerPageHandler}
            >
              {options.map((option, index) => (
                <MenuItem value={option.value} key={index}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </Box>
    </Box>
  );
};

export default ListData;

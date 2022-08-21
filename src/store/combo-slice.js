import { createSlice } from "@reduxjs/toolkit";

const comboInitialState = {
  itemsPerPage: 10,
  currentPage: 0,
  options: [
    { value: 5, label: "5" },
    { value: 10, label: "10" },
    { value: 15, label: "15" },
    { value: 20, label: "20" },
  ],
};

const comboSlice = createSlice({
  name: "combo",
  initialState: comboInitialState,
  reducers: {
    changeItemsPerPage(state, action) {
      state.itemsPerPage = action.payload;
    },

    dropdownOpenHandler() {
      window.scrollTo({
        left: 0,
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    },

    dropdownCloseHandler() {
      window.scrollTo(0, 0);
    },

    changeCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
});

export const comboActions = comboSlice.actions;
export default comboSlice;

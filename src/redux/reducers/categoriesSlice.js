import { createSlice } from "@reduxjs/toolkit";
import { Endpoints } from "../../api/Endpoints";

const initialState = {
  categories: [],
  status: "idle",
  error: null,
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    categoriesLoading: (state) => {
      state.status = "loading";
    },
    categoriesReceived: (state, action) => {
      state.categories = action.payload;
      state.status = "succeeded";
    },
    categoriesError: (state, action) => {
      state.error = action.payload;
      state.status = "failed";
    },
  },
});

export const {
  categoriesLoading,
  categoriesReceived,
  categoriesError,
} = categoriesSlice.actions;

export const fetchCategories = () => async (dispatch) => {
  dispatch(categoriesLoading());
  try {
    const response = await fetch(Endpoints.CATEGORY_URL);
    const categories = await response.json();
    dispatch(categoriesReceived(categories));
  } catch (error) {
    dispatch(categoriesError(error.message));
  }
};

export const selectAllCategories = (state) => state.categories.categories;
export const selectCategoriesStatus = (state) => state.categories.status;
export const selectCategoriesError = (state) => state.categories.error;

export default categoriesSlice.reducer;
import axios from "axios";
import {
  DELETE_CATEGORTY,
  GET_CATEGORY_REQUEST,
  INSERT_CATEGORTY,
  SAVE_ATTRIBUTES,
} from "../actionTypes/actionTypes";

export const getCategories = () => async (dispatch) => {
  const { data } = await axios.get("/api/categories");
  dispatch({
    type: GET_CATEGORY_REQUEST,
    payload: data,
  });
};

export const saveAttributeToCatDoc =
  (key, val, categoryChoosen) => async (dispatch, getState) => {
    const { data } = await axios.post("/api/categories/attr", {
      key,
      val,
      categoryChoosen,
    });
    if (data.categoryUpdataed) {
      dispatch({
        type: SAVE_ATTRIBUTES,
        payload: [...data.categoryUpdataed],
      });
    }
  };

export const newCategory = (category) => async (dispatch, getState) => {
  const cat = getState().getCategories.categories;
  const { data } = await axios.post("/api/categories", { category });
  if (data.categoryCreated) {
    dispatch({
      type: INSERT_CATEGORTY,
      payload: [...cat, data.categoryCreated],
    });
  }
};

export const deleteCategory = (category) => async (dispatch, getState) => {
  const cat = getState().getCategories.categories;
  const categories = cat.filter((item) => item.name !== category);
  const { data } = await axios.delete(
    "/api/categories/" + encodeURIComponent(category)
  );
  if (data.categoryDeleted) {
    dispatch({ type: DELETE_CATEGORTY, payload: [...categories] });
  }
};

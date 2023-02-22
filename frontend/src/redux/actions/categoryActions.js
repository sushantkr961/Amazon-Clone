import axios from "axios";
import {
  GET_CATEGORY_REQUEST,
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

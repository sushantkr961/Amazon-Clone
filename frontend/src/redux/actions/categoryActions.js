import axios from "axios";
import { GET_CATEGORY_REQUEST } from "../actionTypes/actionTypes";

export const getCategories = () => async (dispatch) => {
  const { data } = await axios.get("/api/categories");
  dispatch({
    type: GET_CATEGORY_REQUEST,
    payload: data,
  });
};

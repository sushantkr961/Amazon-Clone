import { GET_CATEGORY_REQUEST } from "../actionTypes/actionTypes";

export const getCategoriesReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case GET_CATEGORY_REQUEST:
      return {
        ...state,
        categories: action.payload,
      };
    default:
      return state;
  }
};

import {
  DELETE_CATEGORTY,
  GET_CATEGORY_REQUEST,
  INSERT_CATEGORTY,
  SAVE_ATTRIBUTES,
} from "../actionTypes/actionTypes";

export const getCategoriesReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case GET_CATEGORY_REQUEST:
      return {
        ...state,
        categories: action.payload,
      };
    case SAVE_ATTRIBUTES:
      return {
        ...state,
        categories: action.payload,
      };
    case INSERT_CATEGORTY:
      return {
        ...state,
        categories: action.payload,
      };
    case DELETE_CATEGORTY:
      return {
        ...state,
        categories: action.payload,
      };
    default:
      return state;
  }
};

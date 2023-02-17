import { ADD_TO_CART } from "../actionTypes/actionTypes";

export const addToCart = () => (dispatch) => {
  dispatch({
    type: ADD_TO_CART,
    someValue: 0,
  });
};

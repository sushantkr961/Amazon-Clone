import { ADD_TO_CART } from "../actionTypes/actionTypes";

export const counterReducer = (state = { value: 0 }, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return { value: state.value + 1 + action.someValue };

    default:
      return state;
  }
};

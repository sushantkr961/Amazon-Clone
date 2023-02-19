import { ADD_TO_CART } from "../actionTypes/actionTypes";

const CART_INITIAL_STATE = {
  cartItems: [],
  itemsCount: 0,
  cartSubtotal: 0,
};

export const cartReducer = (state = CART_INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const productBeingAddedToCart = action.payload;

      const productAlreadyExistsInState = state.cartItems.find(
        (x) => x.productID === productBeingAddedToCart.productID
      );

      const currentState = { ...state };
      if (productAlreadyExistsInState) {
        currentState.itemsCount = 0;
        currentState.cartSubtotal = 0;
        currentState.cartItems = productAlreadyExistsInState;
      } else {
        currentState.itemsCount = "x";
        currentState.cartSubtotal = "x";
      }
      return currentState;

    default:
      return state;
  }
};

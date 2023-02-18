import { LOGIN_USER } from "../actionTypes/actionTypes";

export const userRegisterLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        userInfo: action.payload,
      };
    default:
      return state;
  }
};

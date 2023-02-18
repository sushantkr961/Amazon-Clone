import axios from "axios";
import { LOGIN_USER, LOGOUT_USER } from "../actionTypes/actionTypes";

export const setReduxUserState = (userCreated) => (dispatch) => {
  dispatch({
    type: LOGIN_USER,
    payload: userCreated,
  });
};

// after logout data in redux and storage should be cleared
export const logout = () => (dispatch) => {
  document.location.href = "/login";
  axios.get("/api/logout");
  localStorage.removeItem("userInfo");
  sessionStorage.removeItem("userInfo");
  localStorage.removeItem("cart");
  dispatch({ type: LOGOUT_USER });
};

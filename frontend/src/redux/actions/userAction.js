import { LOGIN_USER } from "../actionTypes/actionTypes";

export const setReduxUserState = (userCreated) => (dispatch) => {
  dispatch({
    type: LOGIN_USER,
    payload: userCreated,
  });
};

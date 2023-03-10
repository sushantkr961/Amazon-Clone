import { SET_CHATROOMS } from "../actionTypes/actionTypes";

export const setChatRooms = (user, message) => async (dispatch) => {
  dispatch({
    type: SET_CHATROOMS,
    payload: {
      user: user,
      message: message,
    },
  });
};

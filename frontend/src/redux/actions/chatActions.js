import {
  MESSAGE_RECEIVED,
  SET_CHATROOMS,
  SET_SOCKET,
} from "../actionTypes/actionTypes";

export const setChatRooms = (user, message) => async (dispatch) => {
  dispatch({
    type: SET_CHATROOMS,
    payload: {
      user: user,
      message: message,
    },
  });
};

export const setSocket = (socket) => async (dispatch) => {
  dispatch({
    type: SET_SOCKET,
    payload: {
      socket: socket,
    },
  });
};

// notification dot for admin only
export const setMessageReceived = (value) => async (dispatch) => {
  dispatch({
    type: MESSAGE_RECEIVED,
    payload: {
      value: value,
    },
  });
};

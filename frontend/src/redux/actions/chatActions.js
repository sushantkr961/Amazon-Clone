import {
  MESSAGE_RECEIVED,
  REMOVE_CHATROOM,
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

export const removeChatRoom = (socketId) => async (dispatch) => {
  dispatch({
    type: REMOVE_CHATROOM,
    payload: {
      socketId: socketId,
    },
  });
};

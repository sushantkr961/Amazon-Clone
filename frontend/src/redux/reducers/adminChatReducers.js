import {
  MESSAGE_RECEIVED,
  SET_CHATROOMS,
  SET_SOCKET,
} from "../actionTypes/actionTypes";

const CHAT_INITIAL_STATE = {
  chatRooms: {},
  socket: false,
  messageReceived: false,
};

export const adminChatReducer = (state = CHAT_INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CHATROOMS:
      let currentState = { ...state };
      if (state.chatRooms[action.payload.user]) {
        currentState.chatRooms[action.payload.user].push({
          client: action.payload.message,
        });
        return { ...state, chatRooms: { ...currentState.chatRooms } };
      } else {
        return {
          ...state,
          chatRooms: {
            ...currentState.chatRooms,
            [action.payload.user]: [{ client: action.payload.message }],
          },
        };
      }

    case SET_SOCKET:
      return {
        ...state,
        socket: action.payload.socket,
      };

    case MESSAGE_RECEIVED:
      return {
        ...state,
        messageReceived: action.payload.value,
      };

    default:
      return state;
  }
};

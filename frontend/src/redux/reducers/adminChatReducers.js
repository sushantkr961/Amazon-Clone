import { SET_CHATROOMS } from "../actionTypes/actionTypes";

const CHAT_INITIAL_STATE = {
  chatRooms: {},
};

export const adminChatReducer = (state = CHAT_INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CHATROOMS:
      return {
        ...state,
        chatRooms: {
          "to do": "chatrooms for admin",
          [action.payload.user]: action.payload.message,
        },
      };
    default:
      return state;
  }
};

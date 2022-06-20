import Chat from "../pages/chat";
import { apis } from "../shared/api";

// Initial State
const initialState = {
  list: [],
  chat: [],
};

// Actions
const LOAD = "chatInfo/LOAD";
const INITIALCHAT = "chatInfo/INITIALCHAT";
const CHATSOCKET = "chatInfo/CHATSOCKET";

// Action Creators
export function loadChats(chatList) {
  return { type: LOAD, chatList };
}

export function initialChat(chat) {
  return { type: INITIALCHAT, chat };
}

export function chatSocket(data) {
  return { type: CHATSOCKET, data };
}

//middlewares
export const ChatListAxios = (id) => {
  return async function (dispatch) {
    await apis
      .loadChatList(id)
      .then((chatList) => {
        dispatch(loadChats(chatList.data.member2));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const initialChatAxios = (id, other) => {
  return async function (dispatch) {
    await apis
      .loadChat(id, other)
      .then((chat) => {
        dispatch(initialChat(chat));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "chatInfo/LOAD": {
      return {
        list: action.chatList,
        chat: state.chat,
      };
    }
    case "chatInfo/INITIALCHAT": {
      return {
        list: state.list,
        chat: action.chat,
      };
    }
    case "chatInfo/CHATSOCKET": {
      return {
        list: state.list,
        chat: { ...state.chat, ...action.chat },
      };
    }

    // do reducer stuff
    default:
      return state;
  }
}

import Chat from "../pages/chat";
import { apis } from "../shared/api";

// Initial State
const initialState = {
  list: [],
  chat: [],
  roomId: null,
  // myUniqueId: null,
};

// Actions
const LOAD = "chatInfo/LOAD";
const ROOMID = "chatInfo/ROOMID";
const INITIALCHAT = "chatInfo/INITIALCHAT";
const CHATSOCKET = "chatInfo/CHATSOCKET";

// Action Creators
export function loadChats(chatList) {
  return { type: LOAD, chatList };
}

export function roomId(id) {
  return { type: ROOMID, id };
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

export const getRoomIdAxios = (id, other) => {
  return async function (dispatch) {
    let myRoomId = null;
    await apis
      .getRoomId(id, other)
      .then((res) => {
        dispatch(roomId(res.data));
        myRoomId = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    return myRoomId;
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
        roomId: state.roomId,
      };
    }
    case "chatInfo/ROOMID": {
      return {
        list: state.list,
        chat: state.chat,
        roomId: action.id,
      };
    }
    case "chatInfo/INITIALCHAT": {
      return {
        list: state.list,
        chat: action.chat,
        roomId: state.roomId,
      };
    }
    case "chatInfo/CHATSOCKET": {
      console.log(action.data);
      return {
        list: state.list,
        chat: [...state.chat, action.data],
        roomId: state.roomId,
      };
    }

    // do reducer stuff
    default:
      return state;
  }
}

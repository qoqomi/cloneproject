import Chat from "../pages/chat";
import { apis } from "../shared/api";

// Initial State
const initialState = {
  list: [],
  chat: [],
  roomId: null,
  otherInfo: {
    name: null,
    imageUrl: null,
  },
};

// Actions
const LOAD = "chatInfo/LOAD";
const ROOMID = "chatInfo/ROOMID";
const INITIALCHAT = "chatInfo/INITIALCHAT";
const CHATSOCKET = "chatInfo/CHATSOCKET";
const OTHERINFO = "chatInfo/OTHERINFO";
const CLEARCHAT = "chatInfo/CLEARCHAT";

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

export function otherInfo(data) {
  return { type: OTHERINFO, data };
}

export function clearChat() {
  return { type: CLEARCHAT };
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
        dispatch(roomId(res.data.newRoom2));
        dispatch(otherInfo(res.data.otherInfo2));
        myRoomId = res.data.newRoom2;
      })
      .catch((err) => {
        console.log(err);
      });
    return myRoomId;
  };
};

export const initialChatAxios = (roomId) => {
  return async function (dispatch) {
    await apis
      .getInitialChat(roomId)
      .then((res) => {
        dispatch(initialChat(res.data.chats));
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
        otherInfo: state.otherInfo,
      };
    }
    case "chatInfo/ROOMID": {
      return {
        list: state.list,
        chat: state.chat,
        roomId: action.id,
        otherInfo: state.otherInfo,
      };
    }
    case "chatInfo/INITIALCHAT": {
      return {
        list: state.list,
        chat: action.chat,
        roomId: state.roomId,
        otherInfo: state.otherInfo,
      };
    }
    case "chatInfo/CHATSOCKET": {
      return {
        list: state.list,
        chat: [...state.chat, action.data],
        roomId: state.roomId,
        otherInfo: state.otherInfo,
      };
    }
    case "chatInfo/OTHERINFO": {
      const newOtherInfo = {
        name: action.data.userName,
        imageUrl: action.data.imageUrl,
      };
      return {
        list: state.list,
        chat: state.chat,
        roomId: state.roomId,
        otherInfo: newOtherInfo,
      };
    }
    case "chatInfo/CLEARCHAT": {
      return {
        list: state.list,
        chat: [],
        roomId: null,
        otherInfo: state.otherInfo,
      };
    }

    // do reducer stuff
    default:
      return state;
  }
}

import { apis } from "../shared/api";
import { deleteCookie, setCookie } from "../shared/cookie";

// action
const LOGIN = "user/LOGIN";
const LOGOUT = "user/LOGOUT";

// initialState
const initialState = {
  userinfo: {
    username: null,
    nickname: null,
    is_login: false,
  },
};

// action creator
export function login(id) {
  return { type: LOGIN, id };
}

export function logOut(userInfo) {
  return { type: LOGOUT, userInfo };
}

//middlewares

// reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "user/LOGIN": {
      const newUserInfo = {
        username: action.id,
        nickname: state.userinfo.nickname,
        is_login: true,
      };
      return { userinfo: newUserInfo };
    }
    case "user/LOGOUT": {
      deleteCookie("JWTToken");
      const newUserInfo = {
        username: null,
        nickname: null,
        is_login: false,
      };
      return { userinfo: newUserInfo };
    }

    // do reducer stuff
    default:
      return state;
  }
}

import { apis } from "../shared/api";
import { deleteCookie, setCookie } from "../shared/cookie";

// action
const LOGIN = "user/LOGIN";
const LOGOUT = "user/LOGOUT";
const USERINFO = "user/USERINFO";
const USERINFOTOTAL = "user/USERINFOTOTAL";
// initialState
const initialState = {
  signup: {
    userEmail: null,
    password: null,
    passwordCheck: null,
    userName: null,
    userAge: null,
    imageUrl: null,
  },
  userinfo: {
    userEmail: null,
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
export function userInfo(info) {
  return { type: USERINFO, info };
}
export function userInfototal(infototal) {
  console.log(infototal);
  return { type: USERINFOTOTAL, infototal };
}

//middlewares
//signup
export const signupAxios = (frm) => {
  return async function (dispatch) {
    let res = null;
    await apis
      .signup(frm)
      .then(() => {
        res = true;
      })
      .catch((err) => {
        console.log(err);
        res = false;
      });
    return res;
  };
};

export const loginAxios = (userEmail, password) => {
  return async function (dispatch) {
    let success = null;
    await apis
      .login(userEmail, password)

      .then((res) => {
        localStorage.setItem("token", res.data.token);
        dispatch(login(userEmail));
        console.log(login(res));
        success = true;
      })
      .catch((err) => {
        success = false;
        console.log(err);
      });
    return success;
  };
};

export const checkUserValidation = () => {
  return async function (dispatch) {
    console.log("here");
    await apis
      .checkUser()
      .then((res) => {
        dispatch(login(res.data.userEmail));
      })
      .catch((err) => {
        // localStorage.removeItem("token");
        console.log(err);
      });
  };
};

// reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "user/LOGIN": {
      console.log("들어옴");
      const newUserInfo = {
        userEmail: action.id,
        is_login: true,
      };
      return {
        signup: state.info,
        userinfo: newUserInfo,
      };
    }
    case "user/LOGOUT": {
      deleteCookie("JWTToken");
      const newUserInfo = {
        userEmail: null,
        is_login: false,
      };
      return {
        signup: state.info,
        userinfo: newUserInfo,
      };
    }
    case "user/USERINFO": {
      const newUserInfo = action.info;
      return {
        signup: newUserInfo,
        userInfo: state.userinfo,
      };
    }
    case "user/USERINFOTOTAL": {
      const newUserInfo = action.infototal;
      return {
        signup: newUserInfo,
        userInfo: state.userinfo,
      };
    }
    default:
      return state;
  }
}

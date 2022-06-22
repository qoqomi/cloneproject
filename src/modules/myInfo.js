import { apis } from "../shared/api";

// action
const GETINFO = "myInfo/GETINFO";
const CLEANUP = "myInfo/CLEANUP";

// initialState
const initialState = {
  myInfo: {
    userName: null,
    userEmail: null,
    userIntro: null,
    category: [],
    imageUrl: null,
    workPlace: null,
  },
};

// action creator
export function getMyInfo(data) {
  return { type: GETINFO, data };
}

export function cleanMyInfo() {
  return { type: CLEANUP, data: null };
}

//middlewares
export const getMyInfoAxios = (frm) => {
  return async function (dispatch) {
    let res = null;
    await apis
      .myInfo()
      .then((res) => {
        dispatch(getMyInfo(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
    return res;
  };
};

// reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "myInfo/GETINFO": {
      return { myInfo: action.data.user };
    }
    case "myInfo/CLEANUP": {
      return {
        myInfo: {
          userName: null,
          userEmail: null,
          userIntro: null,
          category: [],
          imageUrl: null,
          workPlace: null,
        },
      };
    }
    default:
      return state;
  }

  // do reducer stuff
}

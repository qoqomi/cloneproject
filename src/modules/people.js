import { apis } from "../shared/api";

// Actions
const LOAD = "people/LOAD";
// const PUSH = "people/PUSH";
//action creator

export function loadPeople(people_list) {
  return { type: LOAD, people_list };
}

// export function pushPeople(people_push) {
//   return { type: PUSH, people_push };
// }

//middleware
export const loadPeopleAxios = () => {
  return async function (dispatch) {
    await apis
      .load()
      .then((response) => {
        console.log(response);
        let people = response.data;
        dispatch(loadPeople(people));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// Initial State
const initialState = {
  users: [
    // {
    //   id: 0,
    //   userAge: 30,
    //   userName: "공지철",
    //   profileImage:
    //     "https://mblogthumb-phinf.pstatic.net/MjAxNzEyMjBfMjkz/MDAxNTEzNzMwODQ0MzY0.6uiPZ6jEGJDpoNlIh45fMz_6YOuhsqcl8DExtIti_TUg.n6kNn7k8SFZyCEOapfbZkLWKL6YortqT_5u4YXaYd70g.JPEG.ruddl1219/%EA%B3%B5%EC%9C%A0_%EB%B0%B0%EA%B2%BD%ED%99%94%EB%A9%B41.jpg?type=w800",
    //   like: true,
    //   userIntro: "저는 누구",
    //   category: ["요리", "캠핑"],
    //   workPlace: "항해99-6주차",
    // },
    // {
    //   id: 1,
    //   userAge: 40,
    //   userName: "Tom",
    //   profileImage:
    //     "https://cdnweb01.wikitree.co.kr/webdata/editor/202008/10/img_20200810160752_a49cf79e.webp",
    //   like: true,
    //   userIntro: "저는 누구",
    //   category: ["요리", "캠핑"],
    //   workPlace: "항해99-6주차",
    // },
    // {
    //   id: 2,
    //   userAge: 40,
    //   userName: "Tom",
    //   profileImage:
    //     "https://cdnweb01.wikitree.co.kr/webdata/editor/202008/10/img_20200810160752_a49cf79e.webp",
    //   like: true,
    //   userIntro: "저는 누구",
    //   category: ["요리", "캠핑"],
    //   workPlace: "항해99-6주차",
    // },
  ],
};

//middlewares

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "people/LOAD": {
      return { users: action.people_list };
    }

    // do reducer stuff
    default:
      return state;
  }
}

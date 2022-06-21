import axios from "axios";
import { apis } from "../shared/api";

// Actions
const LOAD = "people/LOAD";
const GOOD = "people/GOOD";
const BAD = "people/BAD";
//action creator

export function loadPeople(people_list) {
  return { type: LOAD, people_list };
}
export function goodPeople(people_good) {
  console.log("들어옴");
  return { type: GOOD, people_good };
}

export function badPeople(people_bad) {
  return { type: BAD, people_bad };
}
// export function pushPeople(people_push) {
//   return { type: PUSH, people_push };
// }

// middleware
export const loadPeopleAxios = () => {
  return async function (dispatch) {
    await apis
      .load()
      .then((response) => {
        let people = response.data;
        dispatch(loadPeople(people));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const goodPeopleAxios = (userId, select) => {
  console.log("goodpeople초기:", userId, select);
  return async function (dispatch) {
    await apis
      .selectGood(userId, select)
      .then((res) => {
        console.log("goodpeople중기:", userId, select);
        console.log(res);
        const post = {
          userId: res.userId,
          select: res.select,
        };
        dispatch(goodPeople(post));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const badPeopleAxios = (selectId, selet) => {
  return function async(dispatch) {
    apis
      .selectBad(selectId, selet)
      .then((res) => {
        dispatch(
          badPeople({
            _id: res.data.users[0]._id,
            userAge: res.data.users[0].userAge,
            userName: res.data.users[0].userName,
            imageUrl: res.data.users[0].imageUrl,
            userIntro: res.data.users[0].userIntro,
            category: res.data.users[0].category,
            workPlace: res.data.users[0].workPlace,
          })
        );
      })
      .catch((err) => {
        console.log("들어옴");
        console.log(err);
      });
  };
};
// Initial State
const initialState = {
  users: [],
};

//middlewares

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "people/LOAD": {
      return { users: action.people_list };
    }
    case "people/GOOD": {
      console.log("들어옴");
      const new_people = [action.people_good, ...state.users];
      return { users: new_people };
    }
    case "people/BAD": {
      let new_people = [...state.users.users];

      new_people[0] = new_people[1];

      // new_people.pop();
      new_people.pop();
      new_people.push(action.people_bad);

      const set = [new_people];
      // console.log(set);

      return { users: set };
    }
    // do reducer stuff
    default:
      return state;
  }
}

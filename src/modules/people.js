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
  return { type: GOOD, people_good };
}

export function badPeople(people_bad) {
  return { type: BAD, people_bad };
}

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

export const goodPeopleAxios = (selectId, select) => {
  console.log(selectId);
  return async function (dispatch) {
    apis
      .selectGood(selectId, select)
      .then((res) => {
        console.log("newDate:", res.data.users[0]._id);
        let post = [
          {
            _id: res.data.users[0]._id,
            userName: res.data.users[0].userName,
            userAge: res.data.users[0].userAge,
            imageUrl: res.data.users[0].imageUrl,
            userIntro: res.data.users[0].userIntro,
            workPlace: res.data.users[0].workPlace,
            category: res.data.users[0].category,
          },
        ];
        console.log(post);

        dispatch(goodPeople(post));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const badPeopleAxios = (selectId, select) => {
  console.log(selectId);
  return async function (dispatch) {
    apis
      .selectBad(selectId, select)
      .then((res) => {
        console.log("newDate:", res.data.users[0]._id);
        let post = [
          {
            _id: res.data.users[0]._id,
            userName: res.data.users[0].userName,
            userAge: res.data.users[0].userAge,
            imageUrl: res.data.users[0].imageUrl,
            userIntro: res.data.users[0].userIntro,
            workPlace: res.data.users[0].workPlace,
            category: res.data.users[0].category,
          },
        ];
        console.log(post);

        dispatch(badPeople(post));
      })
      .catch((err) => {
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
      console.log("load:", action.people_list.users);
      return { users: action.people_list.users };
    }
    case "people/GOOD": {
      let new_people = [...state.users];
      new_people[0] = new_people[1];
      new_people.pop();
      new_people.push(action.people_good[0]);
      const set = new_people;
      return { users: set };
    }
    case "people/BAD": {
      let new_people = [...state.users];

      new_people[0] = new_people[1];
      new_people.pop();

      new_people.push(action.people_bad[0]);
      const set = new_people;
      console.log("lastData:", set);
      return { users: set };
    }

    default:
      return state;
  }
}

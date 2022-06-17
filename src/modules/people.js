import { apis } from "../shared/api";

// Actions

// Initial State
const initialState = {};

//middlewares

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "people/LOAD": {
      return {};
    }

    // do reducer stuff
    default:
      return state;
  }
}

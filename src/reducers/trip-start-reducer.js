import { TRIP_START } from "../actions/types";

const INITIAL_STATE = {
  tripStart: false,
  userName: ""
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case TRIP_START:
      return {
        ...state,
        tripStart: action.payload,
        user: action.payload
      };
    default:
      return state;
  }
}

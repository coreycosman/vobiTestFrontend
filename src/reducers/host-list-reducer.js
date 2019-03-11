import { GET_HOSTS } from '../actions/types';

const INITIAL_STATE = {
  hostList: [],
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_HOSTS:
      return {
        ...state,
        hostList: [...action.payload],
      };
    default:
      return state;
  }
}

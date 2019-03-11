import { SERVER_ERROR, RESET_SERVER_ERROR_STATE } from '../actions/types';

const INITIAL_STATE = {
  serverErrMessage: '',
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SERVER_ERROR:
      return { ...state, serverErrMessage: action.payload };
    case RESET_SERVER_ERROR_STATE:
      return { ...state, serverErrMessage: action.payload };
    default:
      return state;
  }
}

import {
  CREATE_COMMENT_ERRORS,
  RESET_COMMENT_ERRORS,
} from '../../actions/types';

const INITIAL_STATE = {
  commentErrorsList: [],
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CREATE_COMMENT_ERRORS:
      return { ...state, commentErrorsList: action.payload };
    case RESET_COMMENT_ERRORS:
      return { ...state, commentErrorsList: [] };
    default:
      return state;
  }
}

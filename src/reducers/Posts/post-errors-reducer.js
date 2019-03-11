import { CREATE_POST_ERRORS, RESET_POST_ERRORS } from '../../actions/types';

const INITIAL_STATE = {
  postErrorsArray: [],
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CREATE_POST_ERRORS:
      return { ...state, postErrorsArray: action.payload };
    case RESET_POST_ERRORS:
      return { ...state, postErrorsArray: action.payload };
    default:
      return state;
  }
}

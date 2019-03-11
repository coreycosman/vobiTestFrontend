import { AUTH_ERRORS, LOGIN_ERRORS } from '../../actions/types';

const INITIAL_STATE = {
  authErrorsArray: [],
  loginErrorsArray: [],
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_ERRORS:
      return { ...state, authErrorsArray: action.payload };
    case LOGIN_ERRORS:
      return { ...state, loginErrorsArray: action.payload };
    default:
      return state;
  }
}

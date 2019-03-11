import setAuthToken from '../utils/set-auth-token';
import jwtDecode from 'jwt-decode';
import Api from '../services/Api';

import {
  SET_CURRENT_USER,
  AUTH_ERRORS,
  LOGIN_ERRORS,
  SERVER_ERROR,
} from './types';

const authSequence = token => {
  // store token in local storage
  localStorage.setItem('jwtToken', token);
  // set token in req header
  setAuthToken(token);
};
// decode token to object
const decodeToken = token => {
  const decoded = jwtDecode(token);
  decoded.token = token;
  return decoded;
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

export const signup = (formProps, callback) => async dispatch => {
  const res = await Api()
    .post('users', formProps)
    // dispatch validation errors
    .catch(e => {
      console.log(e.response.data);
      dispatch({ type: AUTH_ERRORS, payload: e.response.data.errors });
    });
  if (res) {
    try {
      const token = res.data;
      authSequence(token);
      dispatch(setCurrentUser(decodeToken(token)));
      // callback for route redirect
      callback();
    } catch (e) {
      console.log(e);
      dispatch({
        type: SERVER_ERROR,
        payload: e.response.data.serverErrMessage,
      });
    }
  }
};

export const login = (formProps, callback) => async dispatch => {
  const res = await Api()
    .post('users/login', formProps)
    .catch(e => {
      dispatch({ type: LOGIN_ERRORS, payload: e.response.data.errors });
    });
  if (res) {
    try {
      const token = res.data;
      authSequence(token);
      dispatch(setCurrentUser(decodeToken(token)));
      // callback for route redirect
      callback();
    } catch (e) {
      dispatch({
        type: SERVER_ERROR,
        payload: e.response.data.serverErrMessage,
      });
    }
  }
};

export const logout = callback => async dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};

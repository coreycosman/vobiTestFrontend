import Api from '../services/Api';

import {
  FETCH_ALL_POSTS,
  FETCH_USER_POSTS,
  FETCH_POST,
  CREATE_POST,
  RESET_CREATE_POST_STATE,
  CREATE_POST_ERRORS,
  RESET_POST_ERRORS,
  SERVER_ERROR,
} from './types';

export const createPost = (formProps, callback) => async dispatch => {
  const res = await Api()
    .post('posts', formProps)
    // dispatch validation errors
    .catch(e => {
      console.log(e.response.data);
      dispatch({ type: CREATE_POST_ERRORS, payload: e.response.data.errors });
    });
  if (res) {
    try {
      dispatch({ type: CREATE_POST, payload: res.data.created });
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

export const resetCreatePostState = () => async dispatch => {
  try {
    dispatch({ type: RESET_CREATE_POST_STATE, payload: false });
  } catch (e) {
    console.log(e);
    dispatch({
      type: SERVER_ERROR,
      payload: e.response.data.serverErrMessage,
    });
  }
};

export const resetPostErrorsState = () => async dispatch => {
  try {
    dispatch({ type: RESET_POST_ERRORS, payload: [] });
  } catch (e) {
    console.log(e);
    dispatch({
      type: SERVER_ERROR,
      payload: e.response.data.serverErrMessage,
    });
  }
};

export const fetchAllPosts = () => async dispatch => {
  try {
    const res = await Api().get('posts');
    dispatch({ type: FETCH_ALL_POSTS, payload: res.data.allPosts });
  } catch (e) {
    console.log(e);
    dispatch({
      type: SERVER_ERROR,
      payload: e.response.data.serverErrMessage,
    });
  }
};

export const fetchUserPosts = () => async dispatch => {
  try {
    const res = await Api().get('posts/user');
    dispatch({ type: FETCH_USER_POSTS, payload: res.data });
  } catch (e) {
    console.log(e);
    dispatch({
      type: SERVER_ERROR,
      payload: e.response.data.serverErrMessage,
    });
  }
};

export const fetchPost = postId => async dispatch => {
  try {
    const res = await Api().post('posts/id', postId);
    dispatch({ type: FETCH_POST, payload: res.data.post });
  } catch (e) {
    console.log(e);
    dispatch({
      type: SERVER_ERROR,
      payload: e.response.data.serverErrMessage,
    });
  }
};

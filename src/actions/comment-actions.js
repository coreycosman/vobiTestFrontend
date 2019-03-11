import Api from '../services/Api';

import {
  FETCH_ALL_COMMENTS,
  CREATE_COMMENT,
  SET_COMMENT_COUNT,
  RESET_CREATE_COMMENT_STATE,
  CREATE_COMMENT_ERRORS,
  RESET_COMMENT_ERRORS,
  SERVER_ERROR,
} from './types';

export const createComment = (formProps, callback) => async dispatch => {
  const res = await Api()
    .post('comments', formProps)
    // dispatch validation errors
    .catch(e => {
      console.log(e.response.data);
      dispatch({
        type: CREATE_COMMENT_ERRORS,
        payload: e.response.data.errors,
      });
    });
  if (res) {
    try {
      dispatch({ type: CREATE_COMMENT, payload: res.data.created });
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

export const resetCreateCommentState = () => async dispatch => {
  try {
    dispatch({ type: RESET_CREATE_COMMENT_STATE, payload: false });
  } catch (e) {
    console.log(e);
    dispatch({
      type: SERVER_ERROR,
      payload: e.response.data.serverErrMessage,
    });
  }
};

export const resetCommentErrorsState = () => async dispatch => {
  try {
    dispatch({ type: RESET_COMMENT_ERRORS, payload: [] });
  } catch (e) {
    console.log(e);
    dispatch({
      type: SERVER_ERROR,
      payload: e.response.data.serverErrMessage,
    });
  }
};

export const fetchAllComments = () => async dispatch => {
  try {
    const res = await Api().get('comments');
    dispatch({ type: FETCH_ALL_COMMENTS, payload: res.data.allComments });
  } catch (e) {
    console.log(e);
    dispatch({
      type: SERVER_ERROR,
      payload: e.response.data.serverErrMessage,
    });
  }
};

export const setCommentCount = commentCount => async dispatch => {
  try {
    dispatch({ type: SET_COMMENT_COUNT, payload: commentCount });
  } catch (e) {
    console.log(e);
    dispatch({
      type: SERVER_ERROR,
      payload: ['server error: please try again later'],
    });
  }
};

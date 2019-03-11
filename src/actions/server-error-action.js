import { SERVER_ERROR, RESET_SERVER_ERROR_STATE } from './types';

export const resetServerErrorState = () => async dispatch => {
  try {
    dispatch({ type: RESET_SERVER_ERROR_STATE, payload: '' });
  } catch (e) {
    console.log(e);
    dispatch({
      type: SERVER_ERROR,
      payload: 'server error: please try again later',
    });
  }
};

import { combineReducers } from 'redux';
import authReducer from './Auth/auth-reducer';
import authErrorsReducer from './Auth/auth-errors-reducer';
import postReducer from './Posts/post-reducer';
import postErrorsReducer from './Posts/post-errors-reducer';
import commentReducer from './Comments/comment-reducer';
import commentErrorsReducer from './Comments/comment-errors-reducer';
import serverErrorReducer from './server-error-reducer';

export default combineReducers({
  auth: authReducer,
  authErrors: authErrorsReducer,
  postState: postReducer,
  postErrors: postErrorsReducer,
  commentState: commentReducer,
  commentErrors: commentErrorsReducer,
  serverError: serverErrorReducer,
});

import {
  CREATE_POST,
  RESET_CREATE_POST_STATE,
  FETCH_ALL_POSTS,
  FETCH_USER_POSTS,
  FETCH_POST,
} from '../../actions/types';

const INITIAL_STATE = {
  created: false,
  allPostsList: [],
  userData: {
    userName: '',
    userPostsList: [],
  },
  post: {},
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_ALL_POSTS:
      return { ...state, allPostsList: action.payload };
    case FETCH_POST:
      return { ...state, post: action.payload };
    case CREATE_POST:
      return { ...state, created: action.payload };
    case RESET_CREATE_POST_STATE:
      return { ...state, created: action.payload };
    case FETCH_USER_POSTS:
      return {
        ...state,
        userData: {
          userName: action.payload.userName,
          userPostsList: action.payload.userPosts,
        },
      };
    default:
      return state;
  }
}

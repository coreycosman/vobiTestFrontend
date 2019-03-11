import {
  CREATE_COMMENT,
  RESET_CREATE_COMMENT_STATE,
  FETCH_ALL_COMMENTS,
  SET_COMMENT_COUNT,
} from '../../actions/types';

const INITIAL_STATE = {
  created: false,
  postCommentsList: [],
  allComments: [],
  postCommentsCount: 0,
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_ALL_COMMENTS:
      return { ...state, allComments: action.payload };
    case CREATE_COMMENT:
      return { ...state, created: action.payload };
    case SET_COMMENT_COUNT:
      return { ...state, postCommentsCount: action.payload };
    case RESET_CREATE_COMMENT_STATE:
      return { ...state, created: action.payload };
    default:
      return state;
  }
}

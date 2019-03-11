import { PREV_SLIDE, NEXT_SLIDE, RESET_SLIDE } from '../actions/types';

const INITIAL_STATE = {
  currentIndex: 0,
  itemLength: null,
  translateValue: 0,
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case PREV_SLIDE:
      return {
        ...state,
        ...action.payload,
      };
    case NEXT_SLIDE:
      return {
        ...state,
        ...action.payload,
      };
    case RESET_SLIDE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}

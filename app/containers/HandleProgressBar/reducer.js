/*
 *
 * HandleProgressBar reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, SET_PROGRESS_BAR } from './constants';

export const initialState = fromJS({ progressBarStatus: false });

function handleProgressBarReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PROGRESS_BAR:
      return { ...state, progressBarStatus: action.isOpen };
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default handleProgressBarReducer;

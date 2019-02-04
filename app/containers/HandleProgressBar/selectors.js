import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the handleProgressBar state domain
 */

const selectHandleProgressBarDomain = state =>
  state.get('handleProgressBar', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by HandleProgressBar
 */

const makeSelectHandleProgressBar = () =>
  createSelector(selectHandleProgressBarDomain, substate => substate.toJS());

export default makeSelectHandleProgressBar;
export { selectHandleProgressBarDomain };

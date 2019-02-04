import { createSelector } from 'reselect';
import { initialState } from './reducer';

// Use this to get the global handleProgressBar state
const selectHandleProgressBarDomain = state =>
  state.get('handleProgressBar', initialState);

// Now we can use these sub ones for getting the smaller substates
const makeSelectHandleProgressBar = () =>
  createSelector(selectHandleProgressBarDomain, substate => substate.toJS());

const makeSelectHangleProgressBarStatus = () => [
  createSelector(makeSelectHangleProgressBarStatus, substate =>
    substate.get('progressBarStatus'),
  ),
];

export default makeSelectHandleProgressBar;
export { selectHandleProgressBarDomain };

import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the checkedInContainer state domain
 */

const selectCheckedInContainerDomain = state =>
  state.get('checkedInContainer', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by CheckedInContainer
 */

const makeSelectCheckedInContainer = () =>
  createSelector(selectCheckedInContainerDomain, substate => substate.toJS());

export default makeSelectCheckedInContainer;
export { selectCheckedInContainerDomain };

import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the homePageContainer state domain
 */

const selectHomePageContainerDomain = state =>
  state.get('homePageContainer', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by HomePageContainer
 */

const makeSelectHomePageContainer = () =>
  createSelector(selectHomePageContainerDomain, substate => substate.toJS());

export default makeSelectHomePageContainer;
export { selectHomePageContainerDomain };

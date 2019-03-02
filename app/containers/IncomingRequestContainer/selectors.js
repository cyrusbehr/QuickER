import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the incomingRequestContainer state domain
 */

const selectIncomingRequestContainerDomain = state =>
  state.get('incomingRequestContainer', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by IncomingRequestContainer
 */

const makeSelectIncomingRequestContainer = () =>
  createSelector(selectIncomingRequestContainerDomain, substate =>
    substate.toJS(),
  );

export default makeSelectIncomingRequestContainer;
export { selectIncomingRequestContainerDomain };

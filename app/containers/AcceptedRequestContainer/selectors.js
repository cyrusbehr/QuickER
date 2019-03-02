import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the acceptedRequestContainer state domain
 */

const selectAcceptedRequestContainerDomain = state =>
  state.get('acceptedRequestContainer', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by AcceptedRequestContainer
 */

const makeSelectAcceptedRequestContainer = () =>
  createSelector(selectAcceptedRequestContainerDomain, substate =>
    substate.toJS(),
  );

export default makeSelectAcceptedRequestContainer;
export { selectAcceptedRequestContainerDomain };

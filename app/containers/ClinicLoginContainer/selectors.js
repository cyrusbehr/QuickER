import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the clinicLoginContainer state domain
 */

const selectClinicLoginContainerDomain = state =>
  state.get('clinicLoginContainer', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ClinicLoginContainer
 */

const makeSelectClinicLoginContainer = () =>
  createSelector(selectClinicLoginContainerDomain, substate => substate.toJS());

export default makeSelectClinicLoginContainer;
export { selectClinicLoginContainerDomain };

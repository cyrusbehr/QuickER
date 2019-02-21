import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the clinicLoginContainer state domain
 */

const selectClinicLoginContainerDomain = state =>
  state.get('clinicLoginContainer', initialState);

const makeSelectClinicLoginContainer = () =>
  createSelector(selectClinicLoginContainerDomain, substate => substate);

export default makeSelectClinicLoginContainer;
export { selectClinicLoginContainerDomain };

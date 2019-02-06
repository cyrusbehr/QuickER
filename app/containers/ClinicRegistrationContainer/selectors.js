import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the clinicRegistrationContainer state domain
 */

const selectClinicRegistrationContainerDomain = state =>
  state.get('clinicRegistrationContainer', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ClinicRegistrationContainer
 */

const makeSelectClinicRegistrationContainer = () =>
  createSelector(selectClinicRegistrationContainerDomain, substate =>
    substate.toJS(),
  );

export default makeSelectClinicRegistrationContainer;
export { selectClinicRegistrationContainerDomain };

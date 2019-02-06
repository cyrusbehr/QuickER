import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the hospitalRegistrationContainer state domain
 */

const selectHospitalRegistrationContainerDomain = state =>
  state.get('hospitalRegistrationContainer', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by HospitalRegistrationContainer
 */

const makeSelectHospitalRegistrationContainer = () =>
  createSelector(selectHospitalRegistrationContainerDomain, substate =>
    substate.toJS(),
  );

export default makeSelectHospitalRegistrationContainer;
export { selectHospitalRegistrationContainerDomain };

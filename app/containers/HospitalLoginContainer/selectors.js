import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the hospitalLoginContainer state domain
 */

const selectHospitalLoginContainerDomain = state =>
  state.get('hospitalLoginContainer', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by HospitalLoginContainer
 */

const makeSelectHospitalLoginContainer = () =>
  createSelector(selectHospitalLoginContainerDomain, substate =>
    substate.toJS(),
  );

export default makeSelectHospitalLoginContainer;
export { selectHospitalLoginContainerDomain };

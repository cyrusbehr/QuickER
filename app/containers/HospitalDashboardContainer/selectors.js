import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the hospitalDashboardContainer state domain
 */

const selectHospitalDashboardContainerDomain = state =>
  state.get('hospitalDashboardContainer', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by HospitalDashboardContainer
 */

const makeSelectHospitalDashboardContainer = () =>
  createSelector(selectHospitalDashboardContainerDomain, substate =>
    substate.toJS(),
  );

export default makeSelectHospitalDashboardContainer;
export { selectHospitalDashboardContainerDomain };

import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the clinicDashboardContainer state domain
 */

const selectClinicDashboardContainerDomain = state =>
  state.get('clinicDashboardContainer', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ClinicDashboardContainer
 */

const makeSelectClinicDashboardContainer = () =>
  createSelector(selectClinicDashboardContainerDomain, substate =>
    substate.toJS(),
  );

export default makeSelectClinicDashboardContainer;
export { selectClinicDashboardContainerDomain };

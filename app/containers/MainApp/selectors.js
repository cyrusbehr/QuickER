import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the mainApp state domain
 */

const selectMainAppDomain = state => state.get('mainApp', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by MainApp
 */

const makeSelectMainApp = () =>
  createSelector(selectMainAppDomain, substate => substate.toJS());

export default makeSelectMainApp;
export { selectMainAppDomain };

import { fromJS } from 'immutable';
import clinicDashboardContainerReducer from '../reducer';

describe('clinicDashboardContainerReducer', () => {
  it('returns the initial state', () => {
    expect(clinicDashboardContainerReducer(undefined, {})).toEqual(fromJS({}));
  });
});

import { fromJS } from 'immutable';
import hospitalDashboardContainerReducer from '../reducer';

describe('hospitalDashboardContainerReducer', () => {
  it('returns the initial state', () => {
    expect(hospitalDashboardContainerReducer(undefined, {})).toEqual(fromJS({}));
  });
});

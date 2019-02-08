import { fromJS } from 'immutable';
import clinicLoginContainerReducer from '../reducer';

describe('clinicLoginContainerReducer', () => {
  it('returns the initial state', () => {
    expect(clinicLoginContainerReducer(undefined, {})).toEqual(fromJS({}));
  });
});

import { fromJS } from 'immutable';
import clinicRegistrationContainerReducer from '../reducer';

describe('clinicRegistrationContainerReducer', () => {
  it('returns the initial state', () => {
    expect(clinicRegistrationContainerReducer(undefined, {})).toEqual(fromJS({}));
  });
});

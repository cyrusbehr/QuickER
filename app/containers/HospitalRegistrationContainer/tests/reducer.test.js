import { fromJS } from 'immutable';
import hospitalRegistrationContainerReducer from '../reducer';

describe('hospitalRegistrationContainerReducer', () => {
  it('returns the initial state', () => {
    expect(hospitalRegistrationContainerReducer(undefined, {})).toEqual(fromJS({}));
  });
});

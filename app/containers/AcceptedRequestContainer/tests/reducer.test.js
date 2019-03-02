import { fromJS } from 'immutable';
import acceptedRequestContainerReducer from '../reducer';

describe('acceptedRequestContainerReducer', () => {
  it('returns the initial state', () => {
    expect(acceptedRequestContainerReducer(undefined, {})).toEqual(fromJS({}));
  });
});

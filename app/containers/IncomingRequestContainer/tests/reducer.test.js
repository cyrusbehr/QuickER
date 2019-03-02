import { fromJS } from 'immutable';
import incomingRequestContainerReducer from '../reducer';

describe('incomingRequestContainerReducer', () => {
  it('returns the initial state', () => {
    expect(incomingRequestContainerReducer(undefined, {})).toEqual(fromJS({}));
  });
});

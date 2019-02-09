import { fromJS } from 'immutable';
import hospitalLoginContainerReducer from '../reducer';

describe('hospitalLoginContainerReducer', () => {
  it('returns the initial state', () => {
    expect(hospitalLoginContainerReducer(undefined, {})).toEqual(fromJS({}));
  });
});

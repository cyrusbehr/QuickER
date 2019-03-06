import { fromJS } from 'immutable';
import mainAppReducer from '../reducer';

describe('mainAppReducer', () => {
  it('returns the initial state', () => {
    expect(mainAppReducer(undefined, {})).toEqual(fromJS({}));
  });
});

import { fromJS } from 'immutable';
import handleProgressBarReducer from '../reducer';

describe('handleProgressBarReducer', () => {
  it('returns the initial state', () => {
    expect(handleProgressBarReducer(undefined, {})).toEqual(fromJS({}));
  });
});

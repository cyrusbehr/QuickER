import { fromJS } from 'immutable';
import checkedInContainerReducer from '../reducer';

describe('checkedInContainerReducer', () => {
  it('returns the initial state', () => {
    expect(checkedInContainerReducer(undefined, {})).toEqual(fromJS({}));
  });
});

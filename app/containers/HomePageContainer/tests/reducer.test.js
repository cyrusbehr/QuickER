import { fromJS } from 'immutable';
import homePageContainerReducer from '../reducer';

describe('homePageContainerReducer', () => {
  it('returns the initial state', () => {
    expect(homePageContainerReducer(undefined, {})).toEqual(fromJS({}));
  });
});

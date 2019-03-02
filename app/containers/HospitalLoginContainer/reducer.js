/*
 *
 * HospitalLoginContainer reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, SET_USER_ACTION } from './constants';

export const initialState = fromJS({
  usertype: 'none',
  id: null,
  userReference: null,
});

function hospitalLoginContainerReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_ACTION:
      return {
        ...state,
        usertype: action.usertype,
        userReference: action.userReference,
        id: action.id,
      };
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default hospitalLoginContainerReducer;

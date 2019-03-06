/*
 *
 * ClinicDashboardContainer reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, SET_SOCKET } from './constants';

export const initialState = fromJS({ socket: null });

function clinicDashboardContainerReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SOCKET:
      return state.set('socket', action.socket);
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default clinicDashboardContainerReducer;

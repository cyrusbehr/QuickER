/*
 *
 * HomePageContainer actions
 *
 */

import { DEFAULT_ACTION, SET_SOCKET } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export const setSocket = socket => ({
  type: SET_SOCKET,
  socket,
});

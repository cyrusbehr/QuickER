/*
 *
 * ClinicLoginContainer actions
 *
 */

import { DEFAULT_ACTION, SET_USER_ACTION } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export const setUserDetails = user => ({
  type: SET_USER_ACTION,
  usertype: user.usertype,
  userReference: user.userReference,
  id: user.id,
});

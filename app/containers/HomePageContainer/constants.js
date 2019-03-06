/*
 *
 * HomePageContainer constants
 *
 */

const SET_SOCKET = 'app/HomePageContainer/SET_SOCKET';

const DEFAULT_ACTION = 'app/HomePageContainer/DEFAULT_ACTION';

const HOSPITAL_REGISTRATION_ROUTE = '/register/hospital';
const CLINIC_REGISTRATION_ROUTE = '/register/clinic';
const CLINIC_LOGIN_ROUTE = '/login/clinic';
const HOSPITAL_LOGIN_ROUTE = '/login/hospital';

const LoginCardData = [
  {
    title: 'Hospital',
    redirectRoute: HOSPITAL_LOGIN_ROUTE,
  },
  {
    title: 'Clinic',
    redirectRoute: CLINIC_LOGIN_ROUTE,
  },
];

module.exports = {
  SET_SOCKET,
  LoginCardData,
  DEFAULT_ACTION,
};

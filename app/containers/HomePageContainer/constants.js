/*
 *
 * HomePageContainer constants
 *
 */

const DEFAULT_ACTION = 'app/HomePageContainer/DEFAULT_ACTION';

const loginRoute = '/dashboard';
const clinicMainRoute = '/clinic';
const clinicLoginRoute = clinicMainRoute.concat(loginRoute);
const hospitalMainRoute = '/hospital';
const hospitalLoginRout = hospitalMainRoute.concat(loginRoute);
const HOSPITAL_REGISTRATION_ROUTE = '/register/hospital';

const LoginCardData = [
  {
    title: 'Hospital',
    redirectRoute: HOSPITAL_REGISTRATION_ROUTE,
  },
  {
    title: 'Clinic',
    redirectRoute: clinicLoginRoute,
  },
];

module.exports = {
  clinicMainRoute,
  hospitalMainRoute,
  clinicLoginRoute,
  hospitalLoginRout,
  LoginCardData,
  DEFAULT_ACTION,
};

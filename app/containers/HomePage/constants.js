const loginRoute = '/dashboard';
const clinicMainRoute = '/clinic';
const clinicLoginRoute = clinicMainRoute.concat(loginRoute);
const hospitalMainRoute = '/hospital';
const hospitalLoginRout = hospitalMainRoute.concat(loginRoute);

const LoginCardData = [
  {
    title: 'Hospital',
    redirectRoute: hospitalLoginRout,
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
};

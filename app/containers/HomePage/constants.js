const loginRoute = '/login';
const clinicMainRoute = '/clinic';
const clinicLoginRoute = clinicMainRoute.concat(loginRoute);
const erMainRoute = '/er';
const erLoginRout = erMainRoute.concat(loginRoute);

const LoginCardData = [
  {
    title: 'Hospital',
    redirectRoute: erLoginRout,
  },
  {
    title: 'Clinic',
    redirectRoute: clinicLoginRoute,
  },
];

module.exports = {
  clinicMainRoute,
  erMainRoute,
  clinicLoginRoute,
  erLoginRout,
  LoginCardData,
};

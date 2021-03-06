/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePageContainer from 'containers/HomePageContainer/Loadable';
import HospitalRegistrationContainer from 'containers/HospitalRegistrationContainer/Loadable';
import ClinicLoginContainer from 'containers/ClinicLoginContainer/Loadable';
import HospitalLoginContainer from 'containers/HospitalLoginContainer/Loadable';
import ClinicRegistrationContainer from 'containers/ClinicRegistrationContainer/Loadable';
import HospitalDashboardContainer from 'containers/HospitalDashboardContainer/Loadable';
import ClinicDashboardContainer from 'containers/ClinicDashboardContainer/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import HandleProgressBar from '../HandleProgressBar/Loadable';

import GlobalStyle from '../../global-styles';

export default function App() {
  return (
    <div>
      <HandleProgressBar />
      <Switch>
        <Route exact path="/" component={HomePageContainer} />
        <Route
          exact
          path="/register/hospital"
          component={HospitalRegistrationContainer}
        />
        <Route
          exact
          path="/register/clinic"
          component={ClinicRegistrationContainer}
        />
        <Route exact path="/login/clinic" component={ClinicLoginContainer} />
        <Route
          exact
          path="/login/hospital"
          component={HospitalLoginContainer}
        />
        <Route
          exact
          path="/hospital/dashboard"
          component={HospitalDashboardContainer}
        />
        <Route
          exact
          path="/clinic/dashboard"
          component={ClinicDashboardContainer}
        />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}

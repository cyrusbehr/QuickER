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
import HospitalDashboardContainer from 'containers/HospitalDashboardContainer/Loadable';
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
          path="/hospital/dashboard"
          component={HospitalDashboardContainer}
        />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}

/**
 *
 * MainApp
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';

import HomePageContainer from 'containers/HomePageContainer/Loadable';
import HospitalRegistrationContainer from 'containers/HospitalRegistrationContainer/Loadable';
import ClinicLoginContainer from 'containers/ClinicLoginContainer/Loadable';
import HospitalLoginContainer from 'containers/HospitalLoginContainer/Loadable';
import ClinicRegistrationContainer from 'containers/ClinicRegistrationContainer/Loadable';
import HospitalDashboardContainer from 'containers/HospitalDashboardContainer/Loadable';
import ClinicDashboardContainer from 'containers/ClinicDashboardContainer/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import HandleProgressBar from '../HandleProgressBar/Loadable';

import makeSelectMainApp from './selectors';
import reducer from './reducer';

import GlobalStyle from '../../global-styles';

/* eslint-disable react/prefer-stateless-function */
export class MainApp extends React.Component {
  render() {
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
}

MainApp.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  mainApp: makeSelectMainApp(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'mainApp', reducer });

export default compose(
  withReducer,
  withConnect,
)(MainApp);

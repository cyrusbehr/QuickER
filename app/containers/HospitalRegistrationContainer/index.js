/**
 *
 * HospitalRegistrationContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import axios from 'axios';

import injectReducer from 'utils/injectReducer';
import makeSelectHospitalRegistrationContainer from './selectors';
import reducer from './reducer';

/* eslint-disable react/prefer-stateless-function */
export class HospitalRegistrationContainer extends React.Component {
  componentDidMount() {
    const basedomain = window.location.origin;
    const apiEndpoint = `${basedomain}/api/getscrapedclinics`;
    // Need to make call to our backend route to get all the clinics which can be registered
  }

  render() {
    return <div />;
  }
}

HospitalRegistrationContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  hospitalRegistrationContainer: makeSelectHospitalRegistrationContainer(),
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

const withReducer = injectReducer({
  key: 'hospitalRegistrationContainer',
  reducer,
});

export default compose(
  withReducer,
  withConnect,
)(HospitalRegistrationContainer);

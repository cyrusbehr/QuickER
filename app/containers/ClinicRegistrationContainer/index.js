/**
 *
 * ClinicRegistrationContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import axios from 'axios';

import injectReducer from 'utils/injectReducer';
import { setProgressBar } from '../HandleProgressBar/actions';
import makeSelectClinicRegistrationContainer from './selectors';
import reducer from './reducer';
import { SCRAPED_CLINICS_ROUTE } from './constants';
/* eslint-disable react/prefer-stateless-function */
export class ClinicRegistrationContainer extends React.Component {
  componentDidMount() {
    this.props.onChangeLoadingStatus(true);
    axios
      .get(SCRAPED_CLINICS_ROUTE)
      .then(r => {
        if (r.data.error) {
          // Handle error here
        } else {
          console.log(r.data.response);
        }
      })
      .then(() => {
        this.props.onChangeLoadingStatus(false);
      });
  }

  render() {
    return <div />;
  }
}

ClinicRegistrationContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  onChangeLoadingStatus: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  clinicRegistrationContainer: makeSelectClinicRegistrationContainer(),
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeLoadingStatus: isOpen => {
      dispatch(setProgressBar(isOpen));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({
  key: 'clinicRegistrationContainer',
  reducer,
});

export default compose(
  withReducer,
  withConnect,
)(ClinicRegistrationContainer);

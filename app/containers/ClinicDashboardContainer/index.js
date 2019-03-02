/**
 *
 * ClinicDashboardContainer
 *
 */

import ClinicDashboardNavbar from 'components/ClinicDashboardNavbar/index';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import axios from 'axios';
import injectReducer from 'utils/injectReducer';
import { setProgressBar } from '../HandleProgressBar/actions';
import makeSelectClinicDashboardContainer from './selectors';
import reducer from './reducer';
import { setUserDetails } from '../ClinicLoginContainer/actions';

/* eslint-disable react/prefer-stateless-function */
export class ClinicDashboardContainer extends React.Component {
  componentDidMount() {
    this.props.onChangeLoadingStatus(false);

    // Check that the user is loged in
    axios.get('/checklogin/clinic').then(r => {
      if (r.data.loggedIn) {
        this.props.setUser(r.data.user);
        console.log(r.data.user);
      } else {
        this.props.history.push('/');
      }
    });
  }

  render() {
    return (
      <div>
        <ClinicDashboardNavbar />
      </div>
    );
  }
}

ClinicDashboardContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  onChangeLoadingStatus: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  clinicDashboardContainer: makeSelectClinicDashboardContainer(),
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeLoadingStatus: isOpen => {
      dispatch(setProgressBar(isOpen));
    },
    setUser: user => {
      dispatch(setUserDetails(user));
    },
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'clinicDashboardContainer', reducer });

export default compose(
  withReducer,
  withConnect,
)(ClinicDashboardContainer);

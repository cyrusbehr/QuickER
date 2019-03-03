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
import IncomingRequestContainer from 'containers/IncomingRequestContainer/Loadable';
import AcceptedRequestContainer from 'containers/AcceptedRequestContainer/Loadable';
import CheckedInContainer from 'containers/CheckedInContainer/Loadable';
import axios from 'axios';
import injectReducer from 'utils/injectReducer';
import { setProgressBar } from '../HandleProgressBar/actions';
import makeSelectClinicDashboardContainer from './selectors';
import reducer from './reducer';
import { setUserDetails } from '../ClinicLoginContainer/actions';

/* eslint-disable react/prefer-stateless-function */
export class ClinicDashboardContainer extends React.Component {
  state = {
    incomingRequests: null,
    acceptedRequests: null,
    checkinRequests: null,
  };

  componentDidMount() {
    // Check that the user is loged in
    axios.get('/checklogin/clinic').then(r => {
      if (r.data.loggedIn) {
        this.props.setUser(r.data.user);
        axios
          .get(`/api/patients?id=${r.data.user.userReference}`, null, {
            params: { id: r.data.user.id },
          })
          .then(r => {
            if (r.data.error) {
              console.log('There was an error');
            } else {
              this.setState({
                incomingRequests: r.data.response.incomingRequests,
                acceptedRequests: r.data.response.acceptedRequests,
                checkinRequests: r.data.response.checkinRequests,
              });
            }
            this.props.onChangeLoadingStatus(false);
          });
      } else {
        this.props.history.push('/');
      }
    });
  }

  render() {
    return (
      <div>
        <ClinicDashboardNavbar />
        <IncomingRequestContainer
          incomingRequests={this.state.incomingRequests}
        />
        <AcceptedRequestContainer
          acceptedRequests={this.state.acceptedRequests}
        />
        <CheckedInContainer checkinRequests={this.state.checkinRequests} />
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

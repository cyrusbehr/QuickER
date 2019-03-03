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
import makeSelectClinicLoginContainer from '../ClinicLoginContainer/selectors';

import reducer from './reducer';
import { setUserDetails } from '../ClinicLoginContainer/actions';

/* eslint-disable react/prefer-stateless-function */
export class ClinicDashboardContainer extends React.Component {
  state = {
    incomingRequests: null,
    acceptedRequests: null,
    checkinRequests: null,
  };

  acceptPatient = patientId => {
    const movePatient = this.state.incomingRequests.find(
      x => x._id === patientId,
    );

    const newIncomingRequest = this.state.incomingRequests.filter(obj => {
      return obj._id !== patientId;
    });

    const newAcceptedRequests = [...this.state.acceptedRequests, movePatient];

    this.setState({
      incomingRequests: newIncomingRequest,
      acceptedRequests: newAcceptedRequests,
    });

    axios.post('/api/incoming/accept', {
      patientId,
      clinicId: this.props.user.userReference,
    });
  };

  deletePatient = data => {
    if (data.route === 'incoming') {
      const newIncomingRequest = this.state.incomingRequests.filter(obj => {
        return obj._id !== data.patientId;
      });
      this.setState({
        incomingRequests: newIncomingRequest,
      });
    } else {
      const newAcceptedRequests = this.state.acceptedRequests.filter(obj => {
        return obj._id !== data.patientId;
      });
      this.setState({
        acceptedRequests: newAcceptedRequests,
      });
    }
    axios.post(`/api/${data.route}/delete`, {
      patientId: data.patientId,
      clinicId: this.props.user.userReference,
    });
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
          deletePatient={data => this.deletePatient(data)}
          acceptPatient={patientId => this.acceptPatient(patientId)}
        />
        <AcceptedRequestContainer
          acceptedRequests={this.state.acceptedRequests}
          deletePatient={data => this.deletePatient(data)}
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
  user: makeSelectClinicLoginContainer(),
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

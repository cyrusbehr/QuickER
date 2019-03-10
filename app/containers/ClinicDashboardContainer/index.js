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
import io from 'socket.io-client';
import Notify from 'notifyjs';
import axios from 'axios';
import injectReducer from 'utils/injectReducer';
import { setProgressBar } from '../HandleProgressBar/actions';
import makeSelectClinicDashboardContainer, {
  makeSelectSocket,
} from './selectors';
import makeSelectClinicLoginContainer from '../ClinicLoginContainer/selectors';
import { setSocket } from './actions';

import reducer from './reducer';
import { setUserDetails } from '../ClinicLoginContainer/actions';

/* eslint-disable react/prefer-stateless-function */
export class ClinicDashboardContainer extends React.Component {
  state = {
    incomingRequests: null,
    acceptedRequests: null,
    checkinRequests: null,
    clinicName: '',
    newPatientName: '',
    newPatientHospital: '',
    userReference: null,
  };

  checkInPatient = patientId => {
    const movePatient = this.state.acceptedRequests.find(
      x => x._id === patientId,
    );

    const newAcceptedRequests = this.state.acceptedRequests.filter(
      obj => obj._id !== patientId,
    );

    const newCheckInRequest = [...this.state.checkinRequests, movePatient];

    this.setState({
      acceptedRequests: newAcceptedRequests,
      checkinRequests: newCheckInRequest,
    });

    axios.post('/api/accepted/accept', {
      patientId,
      clinicId: this.state.userReference,
    });
  };

  acceptPatient = patientId => {
    const movePatient = this.state.incomingRequests.find(
      x => x._id === patientId,
    );

    const newIncomingRequest = this.state.incomingRequests.filter(
      obj => obj._id !== patientId,
    );

    const newAcceptedRequests = [...this.state.acceptedRequests, movePatient];

    this.setState({
      incomingRequests: newIncomingRequest,
      acceptedRequests: newAcceptedRequests,
    });

    axios.post('/api/incoming/accept', {
      patientId,
      clinicId: this.state.userReference,
    });
  };

  deletePatient = data => {
    if (data.route === 'incoming') {
      const newIncomingRequest = this.state.incomingRequests.filter(
        obj => obj._id !== data.patientId,
      );
      this.setState({
        incomingRequests: newIncomingRequest,
      });
    } else {
      const newAcceptedRequests = this.state.acceptedRequests.filter(
        obj => obj._id !== data.patientId,
      );
      this.setState({
        acceptedRequests: newAcceptedRequests,
      });
    }

    axios.post(`/api/${data.route}/delete`, {
      patientId: data.patientId,
      clinicId: this.state.userReference,
    });
  };

  onShowNotification = () => {
    console.log('notification was shown!');
  };

  onCloseNotification = () => {
    console.log('notification is closed');
  };

  onClickNotification = () => {
    console.log('notification clicked');
  };

  onErrorNotification = () => {
    console.error(
      'Error showing notification. You may need to request permission.',
    );
  };

  onPermissionGranted = () => {
    console.log('Permission has been granted by the user');
    this.doNotification();
  };

  onPermissionDenied = () => {
    console.warn('Permission has been denied by the user');
  };

  doNotification = () => {
    console.log(this.state);
    let myNotification = new Notify('New Patient', {
      body: this.state.newPatientName,
      notifyShow: this.onShowNotification,
      notifyClose: this.onCloseNotification,
      notifyClick: this.onClickNotification,
      notifyError: this.onErrorNotification,
      timeout: 4,
    });
    myNotification.show();
  };

  componentDidMount() {
    this.props.onChangeLoadingStatus(true);
    // Check that the user is loged in
    axios.get('/checklogin/clinic').then(r => {
      if (r.data.loggedIn) {
        // TODO this dispatch is not getting called since it is another container
        this.props.setUser(r.data.user);

        // TODO remove the following once the setUser works
        this.setState({
          userReference: r.data.user.userReference,
        });

        // Create the socket connection
        this.socket = io();
        this.socket.emit('join', r.data.user.userReference);
        this.props.setIO(this.socket);

        this.props.socket.on('forwardPatient', newPatient => {
          const newIncomingRequest = [
            ...this.state.incomingRequests,
            newPatient,
          ];
          this.setState({
            incomingRequests: newIncomingRequest,
            newPatientName: `${newPatient.firstname} ${newPatient.lastname}`,
            newPatientHospital: newPatient.hospitalName,
          });
          if (!Notify.needsPermission) {
            this.doNotification();
          } else if (Notify.isSupported()) {
            Notify.requestPermission(
              this.onPermissionGranted,
              this.onPermissionDenied,
            );
          }
        });

        this.setState({
          clinicName: r.data.name,
        });
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
        this.props.onChangeLoadingStatus(false);
        this.props.history.push('/');
      }
    });
  }

  render() {
    const dashMessage = `${this.state.clinicName} Dashboard`;
    return (
      <div>
        <ClinicDashboardNavbar message={dashMessage} />
        <div className="flex-parent">
          <IncomingRequestContainer
            incomingRequests={this.state.incomingRequests}
            deletePatient={data => this.deletePatient(data)}
            acceptPatient={patientId => this.acceptPatient(patientId)}
          />
          <AcceptedRequestContainer
            acceptedRequests={this.state.acceptedRequests}
            deletePatient={data => this.deletePatient(data)}
            checkInPatient={patientId => this.checkInPatient(patientId)}
          />
          <CheckedInContainer checkinRequests={this.state.checkinRequests} />
        </div>
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
  socket: makeSelectSocket(),
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeLoadingStatus: isOpen => {
      dispatch(setProgressBar(isOpen));
    },
    setUser: user => {
      dispatch(setUserDetails(user));
    },
    setIO: socket => dispatch(setSocket(socket)),
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

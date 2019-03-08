/**
 *
 *
 * TODO after you press the submit button,
 *  need to clear the state so that when they
 * want to refer a new patient the confirm button
 * is disabled again
 */

import HospitalDashboardCard from 'components/HospitalDashboardCard/index';
import HospitalDashboardNavbar from 'components/HospitalDashboardNavbar/index';
import PropTypes from 'prop-types';
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';

import { connect } from 'react-redux';
import { compose } from 'redux';
import Snackbar from 'components/Snackbar/index';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { setProgressBar } from '../HandleProgressBar/actions';
import { QUEUE_PATIENT_ROUTE } from './constants';
import makeSelectHospitalLoginContainer from '../HospitalLoginContainer/selectors';
import reducer from './reducer';
import saga from './saga';
import { setUserDetails } from '../HospitalLoginContainer/actions';

import makeSelectHospitalDashboardContainer from './selectors';

/* eslint-disable react/prefer-stateless-function */
export class HospitalDashboardContainer extends React.Component {
  state = {
    hospitalName: '',
    open: false,
    id: '',
    clinicName: '',
    patientFirstName: '',
    patientLastName: '',
    patientPhone: 0,
    patientDOB: '',
    openError: false,
    openSuccess: false,
    dashboardCardData: [],
  };

  componentDidMount() {
    axios.get('/checklogin/hospital').then(r => {
      if (r.data.loggedIn) {
        this.props.setUser(r.data.user);
        this.setState({
          hospitalName: r.data.hospitalName,
        });
        axios
          .get('/api/clinics', {
            hospitalID: this.props.hospitalDashboardContainer.userReference,
          })
          .then(r => {
            if (r.data.error) {
              console.log('Error : ', r.data.error);
            } else {
              this.setState({
                dashboardCardData: r.data.response.dashboardCardData,
              });
              this.props.onChangeLoadingStatus(false);
            }
          });
      } else {
        this.props.history.push('/');
      }
    });
  }

  handleErrorClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ openError: false });
  };

  handleSuccessClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ openSuccess: false });
  };

  // Returns true if all required values of the form have been filled
  getFormStatus = () =>
    this.state.patientFirstName &&
    this.state.patientLastName &&
    this.state.patientDOB;

  handleClickOpen = data => {
    this.setState({
      open: true,
      id: data.id,
      clinicName: data.clinicName,
    });
  };

  handleConfirm = () => {
    this.props.onChangeLoadingStatus(true);
    this.setState({ open: false });

    console.log('ID:', this.state.id);

    axios
      .post('/patient', {
        firstname: this.state.patientFirstName,
        lastname: this.state.patientLastName,
        phone: this.state.patientPhone,
        clinicId: this.state.id,
        DOB: this.state.patientDOB,
        hospitalName: this.state.hospitalName,
      })
      .then(r => {
        if (r.data.error) {
          this.setState({ openError: true });
        } else {
          this.setState({ openSuccess: true });
        }
        this.props.onChangeLoadingStatus(false);
      });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleFirstNameChange = e => {
    this.setState({ patientFirstName: e.target.value });
  };

  handleLastNameChange = e => {
    this.setState({ patientLastName: e.target.value });
  };

  handlePhoneChange = e => {
    this.setState({ patientPhone: e.target.value });
  };

  handleDOBChange = e => {
    this.setState({ patientDOB: e.target.value });
  };

  render() {
    const { open } = this.state;
    const autohideDur = 8000;
    return (
      <React.Fragment>
        <HospitalDashboardNavbar hospitalName={this.state.hospitalName} />
        <Snackbar
          variant="success"
          message={`${this.state.patientFirstName} was successfully added to ${
            this.state.clinicName
          } queue`}
          open={this.state.openSuccess}
          handleClose={this.handleSuccessClose}
          autoHideDuration={autohideDur}
        />
        <Snackbar
          variant="error"
          message={`Unable to add ${this.state.patientFirstName} to ${
            this.state.clinicName
          } queue`}
          open={this.state.openError}
          handleClose={this.handleErrorClose}
          autoHideDuration={autohideDur}
        />
        <div className="hospitalDashCardContainer">
          {this.state.dashboardCardData.map(data => (
            <HospitalDashboardCard
              key={data.clinicName}
              clinicName={data.clinicName}
              waitTime={data.waitTime}
              walkTime={data.walkTime}
              waitUnit={data.waitUnit}
              driveTime={data.driveTime}
              address={data.address}
              active={data.active}
              id={data.id}
              onButtonPress={data => this.handleClickOpen(data)}
            />
          ))}
        </div>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Add patient to queue
            <br />
            {this.state.clinicName}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>{/* this.state.clinicName */}</DialogContentText>
            <div className="modal-form-content">
              <TextField
                required
                autoFocus
                margin="dense"
                id="firstName"
                label="First Name"
                type="text"
                fullWidth
                onChange={e => this.handleFirstNameChange(e)}
              />
              <TextField
                required
                margin="dense"
                id="lastName"
                label="Last Name"
                type="text"
                fullWidth
                onChange={e => this.handleLastNameChange(e)}
              />
              <TextField
                required
                id="date"
                label="Date of Birth"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                onChange={e => this.handleDOBChange(e)}
              />
              <TextField
                margin="dense"
                id="phone"
                label="Phone"
                type="number"
                fullWidth
                onChange={e => this.handlePhoneChange(e)}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={this.handleConfirm}
              color="primary"
              disabled={!this.getFormStatus()}
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

HospitalDashboardContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  onChangeLoadingStatus: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  hospitalDashboardContainer: makeSelectHospitalLoginContainer(),
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

const withReducer = injectReducer({
  key: 'hospitalDashboardContainer',
  reducer,
});
const withSaga = injectSaga({ key: 'hospitalDashboardContainer', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HospitalDashboardContainer);

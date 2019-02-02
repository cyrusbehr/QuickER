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
import Snackbar from '../../components/Snackbar/index';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { DashboardCardData } from './constants';
import reducer from './reducer';
import saga from './saga';
import makeSelectHospitalDashboardContainer from './selectors';

/* eslint-disable react/prefer-stateless-function */
export class HospitalDashboardContainer extends React.Component {
  state = {
    open: false,
    id: '',
    clinicName: '',
    patientFirstName: '',
    patientLastName: '',
    patientPhone: 0,
    patientDOB: '',
    openError: false,
    openSuccess: false,
  };

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
    this.setState({ open: false });

    const basedomain = window.location.origin;
    const apiEndpoint = `${basedomain}/api/queuepatient`;
    console.log(apiEndpoint);
    axios
      .post(apiEndpoint, {
        firstname: this.state.patientFirstName,
        lastname: this.state.patientLastName,
        phone: this.state.patientPhone,
        clinicID: this.state.id,
        DOB: this.state.patientDOB,
      })
      .then(r => {
        if (r.error) {
          this.setState({ openError: true });
        } else {
          this.setState({ openSuccess: true });
        }
      })
      .catch(err => {
        console.log('There was an error with the request : ', err);
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

    return (
      <React.Fragment>
        <HospitalDashboardNavbar />
        <Snackbar
          variant="success"
          message={`${this.state.patientFirstName} was successfully added to ${
            this.state.clinicName
          } queue`}
          open={this.state.openSuccess}
          handleClose={this.handleSuccessClose}
          autoHideDuration="8000"
        />
        <Snackbar
          variant="error"
          message={`Unable to add ${this.state.patientFirstName} to ${
            this.state.clinicName
          } queue`}
          open={this.state.openError}
          handleClose={this.handleErrorClose}
          autoHideDuration="8000"
        />
        <div className="hospitalDashCardContainer">
          {DashboardCardData.map(data => {
            return (
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
            );
          })}
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
            <DialogContentText>{/*this.state.clinicName*/}</DialogContentText>
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
};

const mapStateToProps = createStructuredSelector({
  hospitalDashboardContainer: makeSelectHospitalDashboardContainer(),
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
  key: 'hospitalDashboardContainer',
  reducer,
});
const withSaga = injectSaga({ key: 'hospitalDashboardContainer', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HospitalDashboardContainer);

/**
 *
 * HospitalDashboardContainer
 *
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
  };

  // Returns true if all required values of the form have been filled
  getFormStatus = () => {
    return (
      this.state.patientFirstName &&
      this.state.patientLastName &&
      this.state.patientDOB
    );
  };

  handleClickOpen = data => {
    this.setState({
      open: true,
      id: data.id,
      clinicName: data.clinicName,
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
                margin="dense"
                id="phone"
                label="Phone"
                type="number"
                fullWidth
                onChange={e => this.handlePhoneChange(e)}
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
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={this.handleClose}
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

/**
 *
 * AcceptedRequestContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AcceptedRequest from 'components/AcceptedRequest/index';
import injectReducer from 'utils/injectReducer';
import makeSelectAcceptedRequestContainer from './selectors';
import reducer from './reducer';

/* eslint-disable react/prefer-stateless-function */
export class AcceptedRequestContainer extends React.Component {
  state = {
    open: false,
    firstname: '',
    lastname: '',
    DOB: '',
    phone: '',
    hospital: '',
  };

  deleteAcceptedRequest = patientId => {
    this.props.deletePatient({
      patientId,
      route: 'accepted',
    });
  };

  showModal = data => {
    this.setState({
      open: true,
      firstname: data.firstname,
      lastname: data.lastname,
      DOB: data.DOB,
      phone: data.phone,
      hospital: data.hospitalName,
    });
  };

  closeModal = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    return (
      <div>
        Accepted Requests
        {this.props.acceptedRequests && this.props.acceptedRequests.length ? (
          this.props.acceptedRequests.map((request, idx) => {
            const key = `${request.firstname}${request.lastname}`;
            return (
              <AcceptedRequest
                deleteAcceptedRequest={patientId => {
                  this.deleteAcceptedRequest(patientId);
                }}
                key={key}
                firstname={request.firstname}
                lastname={request.lastname}
                DOB={request.DOB}
                phone={request.phone}
                idx={idx}
                hospitalName={request.hospitalName}
                showModalFunc={data => this.showModal(data)}
                id={request._id}
                checkInPatient={patientId =>
                  this.props.checkInPatient(patientId)
                }
              />
            );
          })
        ) : (
          <div>None</div>
        )}
        <Dialog
          open={this.state.open}
          onClose={this.closeModal}
          aria-labelledby="form-dialog-title"
        >
          <DialogContent>
            <div className="modal-form-content">
              <span>
                {this.state.firstname} {this.state.lastname}
              </span>
              <br />
              {this.state.DOB}
              <br />
              {this.state.phone}
              <br />
              Sent from {this.state.hospital}
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeModal} color="primary">
              Dismiss
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

AcceptedRequestContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  acceptedRequestContainer: makeSelectAcceptedRequestContainer(),
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

const withReducer = injectReducer({ key: 'acceptedRequestContainer', reducer });

export default compose(
  withReducer,
  withConnect,
)(AcceptedRequestContainer);

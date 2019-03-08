/**
 *
 * CheckedInContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import CheckedIn from 'components/CheckedIn/index';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import injectReducer from 'utils/injectReducer';
import makeSelectCheckedInContainer from './selectors';
import reducer from './reducer';

/* eslint-disable react/prefer-stateless-function */
export class CheckedInContainer extends React.Component {
  state = {
    open: false,
    firstname: '',
    lastname: '',
    DOB: '',
    phone: '',
    hospital: '',
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
      <div className="flex-child">
        <div className="sub-container-title cBlue-Text cFontItalics">
          Checked In
        </div>
        {this.props.checkinRequests && this.props.checkinRequests.length ? (
          this.props.checkinRequests.map((patient, idx) => {
            const key = `${patient.firstname}${patient.lastname}`;
            return (
              <CheckedIn
                firstname={patient.firstname}
                lastname={patient.lastname}
                DOB={patient.DOB}
                phone={patient.phone}
                hospitalName={patient.hospitalName}
                key={key}
                idx={idx}
                showModalFunc={data => this.showModal(data)}
              />
            );
          })
        ) : (
          <div className="none-text cFont">None</div>
        )}
        <Dialog
          open={this.state.open}
          onClose={this.closeModal}
          aria-labelledby="form-dialog-title"
        >
          <DialogContent>
            <div className="modal-form-content cBlue-Text">
              <div className="patient-name">
                {this.state.firstname} {this.state.lastname}
              </div>
              <hr />
              <div className="modal-body">
                <div className="padding-bottom">DOB: {this.state.DOB}</div>
                {!this.state.phone || this.state.phone == 0 ? (
                  ''
                ) : (
                  <div className="padding-bottom">
                    Phone: {this.state.phone}
                  </div>
                )}
                <div className="padding-bottom">
                  Sent from: {this.state.hospital}
                </div>
              </div>
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

CheckedInContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  checkedInContainer: makeSelectCheckedInContainer(),
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

const withReducer = injectReducer({ key: 'checkedInContainer', reducer });

export default compose(
  withReducer,
  withConnect,
)(CheckedInContainer);

/**
 *
 * ClinicRegistrationContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ClinicDashboardNavbar from 'components/ClinicDashboardNavbar/index';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import axios from 'axios';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Button from '@material-ui/core/Button';

import Snackbar from 'components/Snackbar/index';
import ClinicRegistrationForm from 'components/ClinicRegistrationForm/index';
import injectReducer from 'utils/injectReducer';
import { setProgressBar } from '../HandleProgressBar/actions';
import makeSelectClinicRegistrationContainer from './selectors';
import reducer from './reducer';
import { SCRAPED_CLINICS_ROUTE } from './constants';
/* eslint-disable react/prefer-stateless-function */
export class ClinicRegistrationContainer extends React.Component {
  state = {
    formDataReady: false,
    openError: false,
  };

  handleErrorClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ openError: false });
  };

  handleRegisterClinic = formState => {
    this.props.onChangeLoadingStatus(true);
    axios
      .post('/register/clinic', {
        id: formState.id,
        username: formState.username,
        password: formState.password,
        passwordRepeat: formState.passwordRepeat,
        clinicName: formState.clinicName,
        address: formState.address,
        phone: formState.phone,
      })
      .then(r => {
        console.log(r);
        if (r.data.error) {
          this.props.onChangeLoadingStatus(false);
          this.setState({
            errorMessage: r.data.error,
            openError: true,
          });
        } else if (r.data.errors) {
          this.props.onChangeLoadingStatus(false);
          console.log(r.data.errors);
          let errorStr = 'Please fill the following fields:';
          const size = r.data.errors.length;
          r.data.errors.map((error, idx) => {
            errorStr += ` ${error.msg}`;
            if (idx !== size - 1) {
              errorStr += ',';
            }
          });
          this.setState({
            errorMessage: errorStr,
            openError: true,
          });
        } else {
          this.props.history.push('/clinic/dashboard');
        }
      });
  };

  handleLoginNow = () => {
    this.props.history.push('/login/clinic');
  };

  handleRequestClinic = () => {
    console.log('TODO implement this');
  };

  componentDidMount() {
    this.props.onChangeLoadingStatus(true);
    axios
      .get(SCRAPED_CLINICS_ROUTE)
      .then(r => {
        if (r.data.error) {
          // Handle error here
        } else {
          this.setState({ clinicData: r.data.response });
          this.setState({ formDataReady: true });
        }
      })
      .then(() => {
        this.props.onChangeLoadingStatus(false);
      });
  }

  render() {
    const dashMessage = 'Clinic Registration';
    const autoHideDur = 10000; // 10 seconds
    return (
      <div>
        <ClinicDashboardNavbar message={dashMessage} />

        <Snackbar
          variant="error"
          message={`Error: ${this.state.errorMessage}`}
          open={this.state.openError}
          handleClose={this.handleErrorClose}
          autoHideDuration={autoHideDur}
        />
        {this.state.formDataReady && (
          <div>
            <CSSTransition
              in={this.state.formDataReady}
              appear
              classNames="fadeup"
              children={
                <ClinicRegistrationForm
                  clinicData={this.state.clinicData}
                  onRegister={data => this.handleRegisterClinic(data)}
                  handleLoginNow={this.handleLoginNow}
                  handleRequestClinic={this.handleRequestClinic}
                />
              }
              timeout={1200}
            />
          </div>
        )}
      </div>
    );
  }
}

ClinicRegistrationContainer.propTypes = {
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

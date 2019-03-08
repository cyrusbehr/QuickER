/**
 *
 * HospitalLoginContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import HospitalLoginForm from 'components/HospitalLoginForm/index';
import ClinicDashboardNavbar from 'components/ClinicDashboardNavbar/index';
import Snackbar from 'components/Snackbar/index';

import injectReducer from 'utils/injectReducer';
import axios from 'axios';
import { setProgressBar } from '../HandleProgressBar/actions';
import { setUserDetails } from './actions';
import makeSelectHospitalLoginContainer from './selectors';
import reducer from './reducer';

/* eslint-disable react/prefer-stateless-function */
export class HospitalLoginContainer extends React.Component {
  state = {
    username: '',
    password: '',
    openError: false,
  };

  handleErrorClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ openError: false });
  };

  handleInputChange = param => event => {
    this.setState({ [param]: event.target.value });
  };

  handleLogin = () => {
    this.props.onChangeLoadingStatus(true);
    axios
      .post('/login/hospital', {
        username: this.state.username,
        password: this.state.password,
        usertype: 'hospital',
      })
      .then(r => {
        if (r.data.error) {
          this.props.onChangeLoadingStatus(false);
          this.setState({
            errorMessage: r.data.error,
            openError: true,
          });
        } else {
          console.log(r.data.response);
          this.props.setUser(r.data.response);
          this.props.history.push('/hospital/dashboard');
        }
      });
  };

  keyPress = e => {
    if (e.keyCode === 13) {
      this.handleLogin();
    }
  };

  render() {
    const dashMessage = 'Hospital Login';
    const autoHideDur = 10000; // 10 seconds

    return (
      <div>
        <ClinicDashboardNavbar message={dashMessage} />
        <HospitalLoginForm
          onLogin={() => this.handleLogin}
          handleInputChange={data => this.handleInputChange(data)}
          onKeyPressFunc={this.keyPress}
        />
        <Snackbar
          variant="error"
          message={`Error: ${this.state.errorMessage}`}
          open={this.state.openError}
          handleClose={this.handleErrorClose}
          autoHideDuration={autoHideDur}
        />
      </div>
    );
  }
}

HospitalLoginContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  onChangeLoadingStatus: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  hospitalLoginContainer: makeSelectHospitalLoginContainer(),
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

const withReducer = injectReducer({ key: 'hospitalLoginContainer', reducer });

export default compose(
  withReducer,
  withConnect,
)(HospitalLoginContainer);

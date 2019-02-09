/**
 *
 * ClinicLoginContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import ClinicLoginForm from 'components/ClinicLoginForm/index';
import injectReducer from 'utils/injectReducer';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { setProgressBar } from '../HandleProgressBar/actions';
import makeSelectClinicLoginContainer from './selectors';
import reducer from './reducer';

/* eslint-disable react/prefer-stateless-function */
export class ClinicLoginContainer extends React.Component {
  handleRegisterNow = () => {
    this.props.history.push('/register/clinic');
  };

  handleLogin = () => {
    this.props.onChangeLoadingStatus(true);
    axios.post('/login/clinic').then(r => {
      if (r.data.error) {
        console.log('Error : ', r.data.error);
      } else {
        // TODO do something with login deets, maybe put in redux
        this.props.history.push('/clinic/dashboard');
      }
    });
  };

  render() {
    return (
      <div>
        can put some header stuff here like a navbar / ect
        <ClinicLoginForm onLogin={() => this.handleLogin} />
        <div>
          Don't have an account?
          <Button onClick={this.handleRegisterNow}>Register now!</Button>
        </div>
      </div>
    );
  }
}

ClinicLoginContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  onChangeLoadingStatus: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  clinicLoginContainer: makeSelectClinicLoginContainer(),
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeLoadingStatus: isOpen => {
      dispatch(setProgressBar(isOpen));
    },
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'clinicLoginContainer', reducer });

export default compose(
  withReducer,
  withConnect,
)(ClinicLoginContainer);

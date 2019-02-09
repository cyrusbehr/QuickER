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

import injectReducer from 'utils/injectReducer';
import axios from 'axios';
import { setProgressBar } from '../HandleProgressBar/actions';
import makeSelectHospitalLoginContainer from './selectors';
import reducer from './reducer';

/* eslint-disable react/prefer-stateless-function */
export class HospitalLoginContainer extends React.Component {
  handleLogin = () => {
    this.props.onChangeLoadingStatus(true);
    axios.post('/login/hospital').then(r => {
      if (r.data.error) {
        console.log('There was an error : ', r.data.error);
      } else {
        this.props.history.push('/hospital/dashboard');
      }
    });
  };

  render() {
    return (
      <div>
        This is the hospital Login HospitalLoginContainer
        <HospitalLoginForm onLogin={() => this.handleLogin} />
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

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
import makeSelectClinicLoginContainer from './selectors';
import reducer from './reducer';
import Button from '@material-ui/core/Button';

/* eslint-disable react/prefer-stateless-function */
export class ClinicLoginContainer extends React.Component {
  handleRegisterNow = () => {
    this.props.history.push('/register/clinic');
  };

  render() {
    return (
      <div>
        can put some header stuff here like a navbar / ect
        <ClinicLoginForm />
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
};

const mapStateToProps = createStructuredSelector({
  clinicLoginContainer: makeSelectClinicLoginContainer(),
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

const withReducer = injectReducer({ key: 'clinicLoginContainer', reducer });

export default compose(
  withReducer,
  withConnect,
)(ClinicLoginContainer);

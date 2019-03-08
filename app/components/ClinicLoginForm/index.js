/**
 *
 * ClinicLoginForm
 *
 */

import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Card from '@material-ui/core/Card';

import PropTypes from 'prop-types';
// import styled from 'styled-components';

/* eslint-disable react/prefer-stateless-function */
class ClinicLoginForm extends React.PureComponent {
  render() {
    return (
      <Card className="card-login">
        <FormControl required className="clinic-login-form-input">
          <TextField
            id="username"
            label="Username"
            type="text"
            className=""
            margin="normal"
            onChange={this.props.handleInputChange('username')}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            className=""
            margin="normal"
            onChange={this.props.handleInputChange('password')}
          />
          <Button
            variant="contained"
            className="full-width login-button"
            onClick={this.props.onLogin()}
          >
            Login
          </Button>
          <hr className="register-seperator" />
          <div className="register-now">
            Don't have an account?
            <Button onClick={this.props.handleRegisterNow}>
              Register now!
            </Button>
          </div>
        </FormControl>
      </Card>
    );
  }
}

ClinicLoginForm.propTypes = {
  onLogin: PropTypes.func,
};

export default ClinicLoginForm;

/**
 *
 * ClinicLoginForm
 *
 */

import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';

// import PropTypes from 'prop-types';
// import styled from 'styled-components';

/* eslint-disable react/prefer-stateless-function */
class ClinicLoginForm extends React.PureComponent {
  render() {
    return (
      <div>
        <FormControl required className="clinic-login-form-input">
          <TextField
            id="username"
            label="Username"
            type="text"
            className=""
            margin="normal"
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            className=""
            margin="normal"
          />
        </FormControl>
      </div>
    );
  }
}

ClinicLoginForm.propTypes = {};

export default ClinicLoginForm;

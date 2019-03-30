/**
 *
 * ClinicRegistrationForm
 *
 */

import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';

import PropTypes from 'prop-types';
// import styled from 'styled-components';

/* eslint-disable react/prefer-stateless-function */

class ClinicRegistrationForm extends React.PureComponent {
  state = {
    clinicName: '',
    address: '',
    id: '',
    phone: 0,
    username: '',
    password: '',
    passwordRepeat: '',
    authToken: '',
  };

  handleInputChange = param => event => {
    this.setState({ [param]: event.target.value });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    const obj = this.props.clinicData.find(
      elem => elem.name === event.target.value,
    );
    this.setState({ address: obj.address, id: obj._id });
  };

  render() {
    return (
      <Card className="clinic-register-card">
        <form autoComplete="on">
          <FormControl required className="clinic-registration-form-input">
            <InputLabel htmlFor="clinic-name-dropdown">Clinic Name</InputLabel>
            <Select
              value={this.state.clinicName}
              onChange={this.handleChange}
              inputProps={{
                name: 'clinicName',
                id: 'clinic-name-dropdown',
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {this.props.clinicData.map(clinic => {
                if (!clinic.hasRegistered) {
                  return (
                    <MenuItem key={clinic._id} value={clinic.name}>
                      {clinic.name}
                    </MenuItem>
                  );
                }
              })}
            </Select>
          </FormControl>
          <br />
          <FormControl required className="clinic-registration-form-input">
            <TextField
              required
              id="address"
              label="Address"
              type="text"
              className=""
              value={this.state.address}
              onChange={this.handleInputChange('address')}
              margin="normal"
            />
            <TextField
              required
              id="phone"
              label="Clinic Phone Number"
              type="number"
              className=""
              onChange={this.handleInputChange('phone')}
              margin="normal"
            />
            <TextField
              required
              id="username"
              label="Username"
              type="text"
              className=""
              onChange={this.handleInputChange('username')}
              margin="normal"
            />
            <TextField
              required
              id="password"
              label="Password"
              type="password"
              className=""
              onChange={this.handleInputChange('password')}
              margin="normal"
            />
            <TextField
              required
              id="password-repeat"
              label="Password Repeat"
              type="password"
              className=""
              onChange={this.handleInputChange('passwordRepeat')}
              margin="normal"
            />
            <TextField
              required
              id="token"
              label="Authorization Token"
              type="text"
              className=""
              onChange={this.handleInputChange('authToken')}
              margin="normal"
            />
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="raised-button-file"
              multiple
              type="file"
            />
            <Button
              variant="contained"
              component="span"
              onClick={() => this.props.onRegister(this.state)}
            >
              Submit Registration
            </Button>
            <hr className="register-seperator" />
            <div className="register-now">
              Already have an account?
              <Button onClick={this.props.handleLoginNow}>Log in</Button>
            </div>
            <div className="register-now">
              Don't see you clinic listed?
              <Button onClick={this.props.handleRequestClinic}>
                Request a new clinic
              </Button>
            </div>
          </FormControl>
        </form>
      </Card>
    );
  }
}

ClinicRegistrationForm.propTypes = {
  clinicData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      hasRegistered: PropTypes.bool.isRequired,
    }),
  ),
};

export default ClinicRegistrationForm;

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
import Tooltip from '@material-ui/core/Tooltip';

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
  };

  handleInputChange = param => event => {
    this.setState({ [param]: event.target.value });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    const obj = this.props.clinicData.find(elem => {
      return elem.name === event.target.value;
    });
    this.setState({ address: obj.address, id: obj._id });
  };

  render() {
    return (
      <div>
        <form autoComplete="off">
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
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="raised-button-file"
              multiple
              type="file"
            />
            <label htmlFor="raised-button-file">
              <Tooltip
                title="We require a document as proof that you work at
               or are currently managing the clinic. This can be in the form
                of a utility bill or bank statement which shows the address
                 and clinic name"
              >
                <Button
                  variant="contained"
                  component="span"
                  className="full-width"
                >
                  Upload
                </Button>
              </Tooltip>
            </label>
            <Button variant="contained" component="span">
              Submit Registration
            </Button>
          </FormControl>
        </form>
      </div>
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

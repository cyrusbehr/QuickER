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

import PropTypes from 'prop-types';
// import styled from 'styled-components';

/* eslint-disable react/prefer-stateless-function */

class ClinicRegistrationForm extends React.PureComponent {
  state = {
    clinicName: '',
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div>
        <form autoComplete="off">
          <FormControl className="clinic-registration-form-input">
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

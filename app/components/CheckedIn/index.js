/**
 *
 * CheckedIn
 *
 */

import React from 'react';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

/* eslint-disable react/prefer-stateless-function */
class CheckedIn extends React.PureComponent {
  onPress = () => {
    const data = {
      firstname: this.props.firstname,
      lastname: this.props.lastname,
      DOB: this.props.DOB,
      phone: this.props.phone,
      hospitalName: this.props.hospitalName,
    };
    this.props.showModalFunc(data);
  };

  render() {
    const fullname = `${this.props.firstname} ${this.props.lastname}`;
    return (
      <div className="card-1">
        <span>{this.props.idx + 1} </span>
        <span>{fullname}</span>
        <IconButton color="primary" onClick={this.onPress}>
          <Icon>help</Icon>
        </IconButton>
      </div>
    );
  }
}

CheckedIn.propTypes = {};

export default CheckedIn;

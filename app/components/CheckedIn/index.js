/**
 *
 * CheckedIn
 *
 */

import React from 'react';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';

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
      <Card className="checked-in-card check-in-card-padding">
        <div className="center-vertical">
          <span className="cFont card-number ">{this.props.idx + 1} </span>
          <span className="cFont cBlue-Text patient-name">{fullname}</span>
          <span className="align-right">
            <IconButton
              color="primary"
              onClick={this.onPress}
              className="help-button"
            >
              <Icon>help</Icon>
            </IconButton>
          </span>
        </div>
      </Card>
    );
  }
}

CheckedIn.propTypes = {};

export default CheckedIn;

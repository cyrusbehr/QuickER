/**
 *
 * IncomingRequest
 *
 */

import React from 'react';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

/* eslint-disable react/prefer-stateless-function */
class IncomingRequest extends React.PureComponent {
  render() {
    const fullName = `${this.props.firstname} ${this.props.lastname}`;
    return (
      <div className="card-2">
        <div>
          <span>{fullName}</span>
          <span>{this.props.hospitalName}</span>
        </div>
        <div>{this.props.DOB}</div>
        <div>{this.props.phone}</div>
        <div>add to queue</div>
        <Fab color="default">
          <Icon className="icon-color">navigate_next</Icon>
        </Fab>
      </div>
    );
  }
}

IncomingRequest.propTypes = {};

export default IncomingRequest;

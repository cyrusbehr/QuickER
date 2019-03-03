/**
 *
 * IncomingRequest
 *
 */

import React from 'react';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

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
        <Tooltip title="Add patient to queue">
          <IconButton color="secondary">
            <Icon>done</Icon>
          </IconButton>
        </Tooltip>
        <Tooltip title="Reject request">
          <IconButton color="secondary">
            <Icon>close</Icon>
          </IconButton>
        </Tooltip>
      </div>
    );
  }
}

IncomingRequest.propTypes = {};

export default IncomingRequest;

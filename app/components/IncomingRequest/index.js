/**
 *
 * IncomingRequest
 *
 */

import Card from '@material-ui/core/Card';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import React from 'react';

// import PropTypes from 'prop-types';
// import styled from 'styled-components';

/* eslint-disable react/prefer-stateless-function */
class IncomingRequest extends React.PureComponent {
  render() {
    const fullName = `${this.props.firstname} ${this.props.lastname}`;
    return (
      <Card className="checked-in-card cFont">
        <div className="center-vertical">
          <div>
            <span className="cBlue-Text patient-name">{fullName}</span>
            <span className="from-hospital cBlue-Text">
              {this.props.hospitalName}
            </span>
          </div>
          <div className="cBlue-Text card-subtext">
            <span className="bold padding-right ">{this.props.DOB}</span>
            <span>{this.props.phone}</span>
          </div>
          <Tooltip title="Add patient to queue">
            <IconButton
              color="secondary"
              onClick={() => this.props.acceptPatient(this.props.id)}
            >
              <Icon>done</Icon>
            </IconButton>
          </Tooltip>
          <Tooltip title="Reject request">
            <IconButton
              color="secondary"
              onClick={() => this.props.deleteIncomingRequest(this.props.id)}
            >
              <Icon>close</Icon>
            </IconButton>
          </Tooltip>
        </div>
      </Card>
    );
  }
}

IncomingRequest.propTypes = {};

export default IncomingRequest;

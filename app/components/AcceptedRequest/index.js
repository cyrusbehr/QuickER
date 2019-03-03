/**
 *
 * AcceptedRequest
 *
 */

import React from 'react';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

// import PropTypes from 'prop-types';
// import styled from 'styled-components';

/* eslint-disable react/prefer-stateless-function */
class AcceptedRequest extends React.PureComponent {
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
        <Tooltip title="Patient has arrived">
          <IconButton color="secondary">
            <Icon>done</Icon>
          </IconButton>
        </Tooltip>
        <Tooltip title="Remove patient">
          <IconButton
            color="secondary"
            onClick={() => this.props.deleteAcceptedRequest(this.props.id)}
          >
            <Icon>close</Icon>
          </IconButton>
        </Tooltip>
        <IconButton
          color="primary"
          aria-label="Add an alarm"
          onClick={this.onPress}
        >
          <Icon>help</Icon>
        </IconButton>
      </div>
    );
  }
}

AcceptedRequest.propTypes = {};

export default AcceptedRequest;

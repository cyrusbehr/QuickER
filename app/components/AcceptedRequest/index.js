/**
 *
 * AcceptedRequest
 *
 */

import React from 'react';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

// import PropTypes from 'prop-types';
// import styled from 'styled-components';

/* eslint-disable react/prefer-stateless-function */
class AcceptedRequest extends React.PureComponent {
  render() {
    const fullname = `${this.props.firstname} ${this.props.lastname}`;
    return (
      <div>
        <span>{this.props.idx + 1}.</span>
        <span>{fullname}</span>
        <IconButton color="primary" aria-label="Add an alarm">
          <Icon>help</Icon>
        </IconButton>
      </div>
    );
  }
}

AcceptedRequest.propTypes = {};

export default AcceptedRequest;

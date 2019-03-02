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
    return (
      <div className="card-1">
        <div>
          <span>John Doe</span>
          <span>from Saint Pauls</span>
        </div>
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

/**
 *
 * HospitalDashboardCard
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

/* eslint-disable react/prefer-stateless-function */
class HospitalDashboardCard extends React.Component {
  render() {
    return (
      <div>
        <div>Wait time shown here</div>
        <div>
          <span>Walking time shown here</span>
          <span>drive time here</span>
        </div>
        <div>address here</div>
        <div>
          add to queue <button type="button">queue</button>
        </div>
      </div>
    );
  }
}

HospitalDashboardCard.propTypes = {};

export default HospitalDashboardCard;

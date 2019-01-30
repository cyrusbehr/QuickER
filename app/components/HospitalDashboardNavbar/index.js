/**
 *
 * HospitalDashboardNavbar
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function HospitalDashboardNavbar() {
  return (
    <nav className="nav-bar">
      <div className="nav-wrapper white">
        <span className="dashboardTitleFontSize">
          <span className="dashboard-title-header">
            <span className="cRed-Text cFontItalics lighter ">Quick</span>
            <span className="cFontItalics cRed-Text bolder">ER</span>
          </span>
          <span className="cFontItalics cBlue-Text">Hospital Dashboard</span>
        </span>
      </div>
    </nav>
  );
}

HospitalDashboardNavbar.propTypes = {};

export default HospitalDashboardNavbar;

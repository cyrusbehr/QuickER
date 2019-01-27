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
    <nav className="navBar">
      <div className="nav-wrapper white">
        <span className="dashboardTitleFontSize">
          <span className="dashboardTitleHeader">
            <span className="titleFontRed lighterTitleFont ">Quick</span>
            <span className="titleFontRed extraboldTitleFont">ER</span>
          </span>
          <span className="titleFontBlue">Hospital Dashboard</span>
        </span>
      </div>
    </nav>
  );
}

HospitalDashboardNavbar.propTypes = {};

export default HospitalDashboardNavbar;

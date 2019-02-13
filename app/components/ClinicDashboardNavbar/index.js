/**
 *
 * ClinicDashboardNavbar
 *
 */

import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

/* eslint-disable react/prefer-stateless-function */
class ClinicDashboardNavbar extends React.PureComponent {
  render() {
    return (
      <AppBar position="static" color="default">
        <Toolbar>
          <span className="dashboardTitleFontSize">
            <span className="dashboard-title-header">
              <span className="cRed-Text cFontItalics lighter ">Quick</span>
              <span className="cFontItalics cRed-Text bolder">ER</span>
            </span>
            <span className="cFontItalics cBlue-Text">Clinic Dashboard</span>
          </span>
        </Toolbar>
      </AppBar>
    );
  }
}

ClinicDashboardNavbar.propTypes = {};

export default ClinicDashboardNavbar;

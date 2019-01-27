/**
 *
 * HospitalDashboardContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectHospitalDashboardContainer from './selectors';
import reducer from './reducer';
import saga from './saga';
import HospitalDashboardNavbar from 'components/HospitalDashboardNavbar/index';
import HospitalDashboardCard from 'components/HospitalDashboardCard/index';

/* eslint-disable react/prefer-stateless-function */
export class HospitalDashboardContainer extends React.Component {
  render() {
    return (
      <React.Fragment>
        <HospitalDashboardNavbar />
        <HospitalDashboardCard />
      </React.Fragment>
    );
  }
}

HospitalDashboardContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  hospitalDashboardContainer: makeSelectHospitalDashboardContainer(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({
  key: 'hospitalDashboardContainer',
  reducer,
});
const withSaga = injectSaga({ key: 'hospitalDashboardContainer', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HospitalDashboardContainer);

/**
 *
 * HospitalDashboardContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import HospitalDashboardNavbar from 'components/HospitalDashboardNavbar/index';
import HospitalDashboardCard from 'components/HospitalDashboardCard/index';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectHospitalDashboardContainer from './selectors';
import reducer from './reducer';
import saga from './saga';
import { DashboardCardData } from './constants';

/* eslint-disable react/prefer-stateless-function */
export class HospitalDashboardContainer extends React.Component {
  render() {
    return (
      <React.Fragment>
        <HospitalDashboardNavbar />
        <div className="hospitalDashCardContainer">
          {DashboardCardData.map(data => {
            return (
              <HospitalDashboardCard
                key={data.clinicName}
                clinicName={data.clinicName}
                waitTime={data.waitTime}
                walkTime={data.walkTime}
                waitUnit={data.waitUnit}
                driveTime={data.driveTime}
                address={data.address}
                active={data.active}
              />
            );
          })}
        </div>
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

/**
 *
 * HospitalDashboardContainer
 *
 */

import HospitalDashboardCard from 'components/HospitalDashboardCard/index';
import HospitalDashboardNavbar from 'components/HospitalDashboardNavbar/index';
import PropTypes from 'prop-types';
import React from 'react';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { DashboardCardData } from './constants';
import reducer from './reducer';
import saga from './saga';
import makeSelectHospitalDashboardContainer from './selectors';

/* eslint-disable react/prefer-stateless-function */
export class HospitalDashboardContainer extends React.Component {
  state = { open: false };

  close = () => this.setState({ open: false });

  render() {
    const { open, size } = this.state;

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
                id={data.id}
                onButtonPress={data => this.showModal(data)}
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

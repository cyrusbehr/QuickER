/**
 *
 * ClinicDashboardContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import { setProgressBar } from '../HandleProgressBar/actions';
import makeSelectClinicDashboardContainer from './selectors';
import reducer from './reducer';

/* eslint-disable react/prefer-stateless-function */
export class ClinicDashboardContainer extends React.Component {
  componentDidMount() {
    this.props.onChangeLoadingStatus(false);
  }

  render() {
    return <div>This is the clinic dashboard woot!</div>;
  }
}

ClinicDashboardContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  onChangeLoadingStatus: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  clinicDashboardContainer: makeSelectClinicDashboardContainer(),
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeLoadingStatus: isOpen => {
      dispatch(setProgressBar(isOpen));
    },
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'clinicDashboardContainer', reducer });

export default compose(
  withReducer,
  withConnect,
)(ClinicDashboardContainer);

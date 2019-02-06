import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import TopBarProgress from 'react-topbar-progress-indicator';

import injectReducer from 'utils/injectReducer';
import makeSelectHandleProgressBar from './selectors';
import reducer from './reducer';

TopBarProgress.config({
  barColors: {
    '0': '#19B5FE',
    '1.0': '#19B5FE',
  },
  shadowBlur: 0,
  barThickness: 3,
});

/* eslint-disable react/prefer-stateless-function */
export class HandleProgressBar extends React.Component {
  render() {
    const { progressBarStatus } = this.props.handleProgressBar;

    if (progressBarStatus) {
      return <TopBarProgress />;
    }
    return '';
  }
}

HandleProgressBar.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  handleProgressBar: makeSelectHandleProgressBar(),
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

const withReducer = injectReducer({ key: 'handleProgressBar', reducer });

export default compose(
  withReducer,
  withConnect,
)(HandleProgressBar);

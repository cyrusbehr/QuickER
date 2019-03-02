/**
 *
 * AcceptedRequestContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import makeSelectAcceptedRequestContainer from './selectors';
import reducer from './reducer';

/* eslint-disable react/prefer-stateless-function */
export class AcceptedRequestContainer extends React.Component {
  render() {
    return <div />;
  }
}

AcceptedRequestContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  acceptedRequestContainer: makeSelectAcceptedRequestContainer(),
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

const withReducer = injectReducer({ key: 'acceptedRequestContainer', reducer });

export default compose(
  withReducer,
  withConnect,
)(AcceptedRequestContainer);

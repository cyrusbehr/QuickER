/**
 *
 * IncomingRequestContainer
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import IncomingRequest from 'components/IncomingRequest';
import injectReducer from 'utils/injectReducer';
import makeSelectIncomingRequestContainer from './selectors';
import reducer from './reducer';

/* eslint-disable react/prefer-stateless-function */
export class IncomingRequestContainer extends React.Component {
  render() {
    return (
      <div>
        <IncomingRequest />
      </div>
    );
  }
}

IncomingRequestContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  incomingRequestContainer: makeSelectIncomingRequestContainer(),
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

const withReducer = injectReducer({ key: 'incomingRequestContainer', reducer });

export default compose(
  withReducer,
  withConnect,
)(IncomingRequestContainer);

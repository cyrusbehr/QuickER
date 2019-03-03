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

import AcceptedRequest from 'components/AcceptedRequest/index';
import injectReducer from 'utils/injectReducer';
import makeSelectAcceptedRequestContainer from './selectors';
import reducer from './reducer';

/* eslint-disable react/prefer-stateless-function */
export class AcceptedRequestContainer extends React.Component {
  state = {
    open: false,
  };

  handleSuccessClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ openSuccess: false });
  };

  render() {
    return (
      <div>
        {this.props.acceptedRequests &&
          this.props.acceptedRequests.map((request, idx) => {
            const key = `${request.firstname}${request.lastname}`;
            return (
              <AcceptedRequest
                key={key}
                firstname={request.firstname}
                lastname={request.lastname}
                DOB={request.DOB}
                phone={request.phone}
                idx={idx}
                hospitalName={request.hospitalName}
              />
            );
          })}
      </div>
    );
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

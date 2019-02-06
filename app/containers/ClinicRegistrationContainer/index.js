/**
 *
 * ClinicRegistrationContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import axios from 'axios';

import ClinicRegistrationForm from 'components/ClinicRegistrationForm/index';
import injectReducer from 'utils/injectReducer';
import { setProgressBar } from '../HandleProgressBar/actions';
import makeSelectClinicRegistrationContainer from './selectors';
import reducer from './reducer';
import { SCRAPED_CLINICS_ROUTE } from './constants';
/* eslint-disable react/prefer-stateless-function */
export class ClinicRegistrationContainer extends React.Component {
  state = {
    formDataReady: false,
  };

  componentDidMount() {
    this.props.onChangeLoadingStatus(true);
    axios
      .get(SCRAPED_CLINICS_ROUTE)
      .then(r => {
        if (r.data.error) {
          // Handle error here
        } else {
          this.setState({ clinicData: r.data.response });
          this.setState({ formDataReady: true });
        }
      })
      .then(() => {
        this.props.onChangeLoadingStatus(false);
      });
  }

  render() {
    return (
      <div>
        <div>can put some sort of header here</div>
        <div>Can put some background images here or whatever</div>
        {this.state.formDataReady && (
          <ClinicRegistrationForm clinicData={this.state.clinicData} />
        )}
      </div>
    );
  }
}

ClinicRegistrationContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  onChangeLoadingStatus: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  clinicRegistrationContainer: makeSelectClinicRegistrationContainer(),
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeLoadingStatus: isOpen => {
      dispatch(setProgressBar(isOpen));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({
  key: 'clinicRegistrationContainer',
  reducer,
});

export default compose(
  withReducer,
  withConnect,
)(ClinicRegistrationContainer);

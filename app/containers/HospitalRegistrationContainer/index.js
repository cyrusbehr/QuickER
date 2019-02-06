/**
 *
 * HospitalRegistrationContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import axios from 'axios';
import HospitalRegistrationForm from 'components/HospitalRegistrationForm/index';
import { setProgressBar } from '../HandleProgressBar/actions';

import injectReducer from 'utils/injectReducer';
import { SCRAPED_CLINICS_ROUTE } from './constants';
import makeSelectHospitalRegistrationContainer from './selectors';
import reducer from './reducer';

/* eslint-disable react/prefer-stateless-function */
export class HospitalRegistrationContainer extends React.Component {
  componentDidMount() {
    this.props.onChangeLoadingStatus(true);
    axios.get(SCRAPED_CLINICS_ROUTE).then(r => {
      if (r.error) {
        // Handle the error
      } else {
        // Set the state and pass it to the registration form
        this.props.onChangeLoadingStatus(false);
      }
    });
  }

  render() {
    return (
      <div>
        <div>can have sort sort of title bar here </div>
        <div>
          Can put some images in the background (look at what other website have
          as examples (like medimaps)) check to see how i added the background
          to the splash page
        </div>
      </div>
    );
  }
}

HospitalRegistrationContainer.propTypes = {
  //dispatch: PropTypes.func.isRequired,
  onChangeLoadingStatus: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  hospitalRegistrationContainer: makeSelectHospitalRegistrationContainer(),
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
  key: 'hospitalRegistrationContainer',
  reducer,
});

export default compose(
  withReducer,
  withConnect,
)(HospitalRegistrationContainer);

/**
 *
 * HomePageContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import UserSelectionCard from 'components/UserSelectionCard/index';
import injectReducer from 'utils/injectReducer';
import { LoginCardData } from './constants';
import { setProgressBar } from '../HandleProgressBar/actions';

import makeSelectHomePageContainer from './selectors';
import reducer from './reducer';

/* eslint-disable react/prefer-stateless-function */
export class HomePageContainer extends React.Component {
  render() {
    return (
      <div className="homePageContainer">
        <div>
          <div className="align-text-center title-margin">
            <div className="cFontItalics cRed-Text">
              <span className="lighter title-font-size">Quick</span>
              <span className="bolder title-font-size">ER</span>
            </div>
            <div className="action-subtitle cFont cBlue-Text">
              Choose your role
            </div>
          </div>
        </div>
        <div className="login-card-contianer">
          {LoginCardData.map(data => {
            return (
              <UserSelectionCard
                key={data.title}
                title={data.title}
                redirectRoute={data.redirectRoute}
                {...this.props}
                onClickFunc={() => this.props.onChangeLoadingStatus(true)}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

HomePageContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  onChangeLoadingStatus: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  homePageContainer: makeSelectHomePageContainer(),
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

const withReducer = injectReducer({ key: 'homePageContainer', reducer });

export default compose(
  withReducer,
  withConnect,
)(HomePageContainer);
